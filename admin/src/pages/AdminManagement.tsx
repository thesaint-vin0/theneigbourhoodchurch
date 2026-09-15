import { FormEvent, useEffect, useState } from 'react'
import { RefreshCw, Save, UserPlus } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'
import type { Profile, Role } from '../types'
import { roleLabels } from '../lib/rbac'

const assignableRoles: Role[] = ['admin', 'editor']

export default function AdminManagement() {
  const { profile } = useAuth()
  const [admins, setAdmins] = useState<Profile[]>([])
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<Role>('admin')
  const [msg, setMsg] = useState('')
  const [busy, setBusy] = useState(false)
  const [savingRole, setSavingRole] = useState<string | null>(null)

  async function load() {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .in('role', ['super_admin', 'admin', 'editor'])
      .order('created_at')
    if (error) setMsg(error.message)
    else setAdmins((data || []) as Profile[])
  }

  useEffect(() => { load() }, [])

  async function create(e: FormEvent) {
    e.preventDefault()
    setBusy(true)
    setMsg('')
    try {
      const { data, error } = await supabase.functions.invoke('create-admin', {
        body: { email, password, full_name: name, role },
      })
      if (error) {
        let detail = ''
        try { detail = (await (error as any).context?.json?.())?.error || '' } catch {}
        throw new Error(detail || error.message || 'Unable to create administrator')
      }
      if (data?.error) throw new Error(data.error)
      setMsg(`${roleLabels[role]} account created successfully.`)
      setEmail(''); setName(''); setPassword(''); setRole('admin')
      await load()
    } catch (err) {
      setMsg(err instanceof Error ? err.message : 'Unable to create administrator')
    } finally { setBusy(false) }
  }

  async function changeRole(id: string, nextRole: Role) {
    setSavingRole(id)
    setMsg('')
    try {
      const { data, error } = await supabase.functions.invoke('manage-admin', { body: { id, role: nextRole } })
      if (error) {
        let detail = ''
        try { detail = (await (error as any).context?.json?.())?.error || '' } catch {}
        throw new Error(detail || error.message || 'Unable to change role')
      }
      if (data?.error) throw new Error(data.error)
      setMsg(`Role changed to ${roleLabels[nextRole]}.`)
      await load()
    } catch (err) {
      setMsg(err instanceof Error ? err.message : 'Unable to change role')
    } finally { setSavingRole(null) }
  }

  if (profile?.role !== 'super_admin') {
    return <div><h1 className="text-2xl font-bold">Admin Management</h1><p className="text-slate-500 mt-2">Only the Super Admin can create staff accounts or change their roles.</p></div>
  }

  return <div>
    <div className="flex flex-wrap justify-between items-center gap-3">
      <div><h1 className="text-2xl font-bold">Admin Management</h1><p className="text-slate-500 mt-1">Create controlled administrator accounts and assign either Admin or Editor access.</p></div>
      <button onClick={load} className="px-3 py-2 border rounded-lg flex gap-2 items-center"><RefreshCw size={16}/> Refresh</button>
    </div>
    {msg && <div className="mt-4 p-3 rounded-lg border bg-slate-50 text-sm">{msg}</div>}

    <div className="grid lg:grid-cols-2 gap-6 mt-6">
      <form onSubmit={create} className="bg-white border rounded-xl p-6 space-y-4">
        <h2 className="font-semibold flex items-center gap-2"><UserPlus size={18}/> Add administrator</h2>
        <input required type="text" placeholder="Full name" value={name} onChange={e => setName(e.target.value)} className="w-full border rounded-lg px-3 py-2.5" />
        <input required type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="w-full border rounded-lg px-3 py-2.5" />
        <input required minLength={8} type="password" placeholder="Temporary password (8+ characters)" value={password} onChange={e => setPassword(e.target.value)} className="w-full border rounded-lg px-3 py-2.5" />
        <label className="block text-sm">Role
          <select value={role} onChange={e => setRole(e.target.value as Role)} className="mt-1 w-full border rounded-lg px-3 py-2.5">
            {assignableRoles.map(r => <option key={r} value={r}>{roleLabels[r]}</option>)}
          </select>
        </label>
        <button disabled={busy} className="w-full bg-blue-700 text-white rounded-lg py-2.5 disabled:opacity-50">{busy ? 'Creating…' : 'Create staff account'}</button>
      </form>

      <div className="bg-white border rounded-xl p-6">
        <h2 className="font-semibold mb-4">Staff accounts & roles</h2>
        <div className="space-y-3">
          {admins.map(a => <div key={a.id} className="border rounded-lg p-3">
            <div className="font-medium">{a.full_name || 'Unnamed administrator'}</div>
            <div className="text-sm text-slate-500 mt-1">{a.email}</div>
            {a.role === 'super_admin' ? <div className="mt-2 text-xs font-medium text-blue-700">Super Admin — protected account</div> : <div className="flex items-center gap-2 mt-3">
              <select value={a.role} disabled={savingRole === a.id} onChange={e => changeRole(a.id, e.target.value as Role)} className="border rounded-lg px-3 py-2 text-sm">
                {assignableRoles.map(r => <option key={r} value={r}>{roleLabels[r]}</option>)}
              </select>
              {savingRole === a.id && <Save size={16} className="text-slate-400" />}
            </div>}
          </div>)}
          {!admins.length && <div className="text-sm text-slate-500">No staff accounts found.</div>}
        </div>
      </div>
    </div>
  </div>
}
