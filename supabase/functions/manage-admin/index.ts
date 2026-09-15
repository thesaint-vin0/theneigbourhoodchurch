import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { ...cors, 'Content-Type': 'application/json' } })
}

Deno.serve(async req => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors })

  try {
    const auth = req.headers.get('Authorization')
    if (!auth) return json({ error: 'You must be signed in.' }, 401)

    const url = Deno.env.get('SUPABASE_URL')!
    const service = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const admin = createClient(url, service)
    const token = auth.replace(/^Bearer\s+/i, '')
    const { data: { user }, error: userError } = await admin.auth.getUser(token)
    if (userError || !user) return json({ error: 'Your session is invalid or expired. Please sign in again.' }, 401)

    const { data: caller, error: callerError } = await admin.from('profiles').select('role').eq('id', user.id).maybeSingle()
    if (callerError) throw callerError
    if (caller?.role !== 'super_admin') return json({ error: 'Only a Super Admin can manage administrator roles.' }, 403)

    const body = await req.json()
    const targetId = String(body.id || '')
    const role = String(body.role || '')
    const allowedRoles = ['admin', 'editor']

    if (!targetId || !allowedRoles.includes(role)) return json({ error: 'A valid administrator ID and role are required.' }, 400)
    if (targetId === user.id) return json({ error: 'You cannot change your own role.' }, 400)

    const { data: target, error: targetError } = await admin.from('profiles').select('id,role').eq('id', targetId).maybeSingle()
    if (targetError) throw targetError
    if (!target) return json({ error: 'Administrator not found.' }, 404)
    if (target.role === 'super_admin') return json({ error: 'The Super Admin role cannot be changed here.' }, 400)

    const { error } = await admin.from('profiles').update({ role, updated_at: new Date().toISOString() }).eq('id', targetId)
    if (error) throw error

    return json({ id: targetId, role })
  } catch (e) {
    return json({ error: e instanceof Error ? e.message : 'Unable to update administrator role.' }, 400)
  }
})
