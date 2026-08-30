import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Church } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [error,setError] = useState('')
  const [busy,setBusy] = useState(false)
  async function submit(e: FormEvent) {
    e.preventDefault(); setBusy(true); setError('')
    const result = await signIn(email,password)
    setBusy(false)
    if (result.error) setError(result.error); else navigate('/')
  }
  return <div className="min-h-screen bg-slate-950 grid place-items-center p-6">
    <form onSubmit={submit} className="w-full max-w-md bg-white rounded-2xl p-8 shadow-2xl">
      <div className="flex items-center gap-3 mb-7"><div className="p-3 rounded-xl bg-blue-700 text-white"><Church/></div><div><h1 className="font-bold text-xl">TNC Admin</h1><p className="text-sm text-slate-500">Church content management</p></div></div>
      {error && <div className="mb-4 rounded-lg bg-red-50 text-red-700 p-3 text-sm">{error}</div>}
      <label className="block text-sm font-medium">Email<input className="mt-1 w-full border rounded-lg px-3 py-2.5" value={email} onChange={e=>setEmail(e.target.value)} type="email" required/></label>
      <label className="block text-sm font-medium mt-4">Password<input className="mt-1 w-full border rounded-lg px-3 py-2.5" value={password} onChange={e=>setPassword(e.target.value)} type="password" required/></label>
      <button disabled={busy} className="mt-6 w-full rounded-lg bg-blue-700 text-white py-2.5 font-semibold disabled:opacity-50">{busy?'Signing in…':'Sign in'}</button>
    </form>
  </div>
}
