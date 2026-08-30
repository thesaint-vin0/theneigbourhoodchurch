import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const supabase = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!)

Deno.serve(async (req) => {
  if (req.method !== 'POST') return new Response('Method Not Allowed', { status:405 })
  const body = await req.text()
  const signature = req.headers.get('x-paystack-signature') || ''
  const secret = Deno.env.get('PAYSTACK_SECRET_KEY') || ''
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(secret), {name:'HMAC',hash:'SHA-512'}, false, ['sign'])
  const mac = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(body))
  const expected = [...new Uint8Array(mac)].map(b=>b.toString(16).padStart(2,'0')).join('')
  if (expected !== signature) return new Response('Invalid signature', { status:401 })

  const payload = JSON.parse(body)
  if (payload.event === 'charge.success') {
    const data = payload.data
    const reference = data.reference
    await supabase.from('giving_transactions').update({
      status:'success',
      paystack_transaction_id:data.id,
      paid_at:data.paid_at || new Date().toISOString(),
      metadata:data
    }).eq('reference', reference)
  } else if (payload.event === 'charge.failed') {
    await supabase.from('giving_transactions').update({status:'failed', metadata:payload.data}).eq('reference', payload.data?.reference)
  }
  return new Response('OK', {status:200})
})
