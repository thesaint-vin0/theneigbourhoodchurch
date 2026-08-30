import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
const cors={'Access-Control-Allow-Origin':'*','Access-Control-Allow-Headers':'authorization, x-client-info, apikey, content-type'}
function json(body:unknown,status=200){return new Response(JSON.stringify(body),{status,headers:{...cors,'Content-Type':'application/json'}})}
Deno.serve(async req=>{
 if(req.method==='OPTIONS')return new Response('ok',{headers:cors})
 try{
  const auth=req.headers.get('Authorization'); if(!auth) return json({error:'You must be signed in.'},401)
  const url=Deno.env.get('SUPABASE_URL')!, service=Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  const admin=createClient(url,service); const token=auth.replace(/^Bearer\s+/i,''); const{data:{user},error:userError}=await admin.auth.getUser(token); if(userError||!user)return json({error:'Your session is invalid or expired. Please sign in again.'},401)
  const{data:caller,error:callerError}=await admin.from('profiles').select('role').eq('id',user.id).maybeSingle(); if(callerError)throw callerError
  if(caller?.role!=='super_admin')return json({error:'Only a super administrator can create administrators.'},403)
  const body=await req.json();const email=String(body.email||'').trim().toLowerCase();const password=String(body.password||'');const full_name=String(body.full_name||'').trim();const role=body.role==='editor'?'editor':'admin';if(!email||!password||password.length<8)return json({error:'Email and password (minimum 8 characters) are required.'},400)
  const{data:newUser,error:createError}=await admin.auth.admin.createUser({email,password,email_confirm:true,user_metadata:{full_name}});if(createError)throw createError
  const{error:profileError}=await admin.from('profiles').upsert({id:newUser.user.id,email,full_name,role,updated_at:new Date().toISOString()});if(profileError){await admin.auth.admin.deleteUser(newUser.user.id);throw profileError}
  return json({id:newUser.user.id,email,role})
 }catch(e){const message=e instanceof Error?e.message:'Unable to create administrator';return json({error:message},400)}
})
