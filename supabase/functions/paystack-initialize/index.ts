import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const cors = { 'Access-Control-Allow-Origin':'*', 'Access-Control-Allow-Headers':'authorization, x-client-info, apikey, content-type' }

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors })
  try {
    const { name, email, amount, currency='NGN', fund='General Giving', callback_url } = await req.json()
    const numericAmount = Number(amount)
    if (!email || !Number.isFinite(numericAmount) || numericAmount <= 0) {
      return new Response(JSON.stringify({ error:'Invalid giving details' }), { status:400, headers:{...cors,'Content-Type':'application/json'} })
    }

    const secret = Deno.env.get('PAYSTACK_SECRET_KEY')
    const supabase = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!)
    if (!secret) throw new Error('PAYSTACK_SECRET_KEY is not configured')

    const reference = `TNC-${crypto.randomUUID()}`
    const { error: insertError } = await supabase.from('giving_transactions').insert({
      name: name || null, email, amount: numericAmount, currency, fund, status:'pending', reference
    })
    if (insertError) throw insertError

    const response = await fetch('https://api.paystack.co/transaction/initialize', {
      method:'POST',
      headers:{ Authorization:`Bearer ${secret}`, 'Content-Type':'application/json' },
      body: JSON.stringify({
        email, amount: Math.round(numericAmount * 100), currency, reference,
        callback_url: callback_url || undefined,
        metadata:{ name, fund, currency, church_reference:reference }
      })
    })
    const result = await response.json()
    if (!response.ok || !result.status) throw new Error(result.message || 'Paystack initialization failed')
    return new Response(JSON.stringify({ authorization_url:result.data.authorization_url, reference }), { headers:{...cors,'Content-Type':'application/json'} })
  } catch (e) {
    return new Response(JSON.stringify({ error:e instanceof Error?e.message:'Unable to initialize payment' }), { status:500, headers:{...cors,'Content-Type':'application/json'} })
  }
})
