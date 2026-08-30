import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { session, profile, loading } = useAuth()
  if (loading) return <div className="min-h-screen grid place-items-center bg-slate-950 text-white">Loading…</div>
  if (!session) return <Navigate to="/login" replace />
  if (!profile || !['super_admin', 'admin', 'editor'].includes(profile.role)) {
    return <div className="min-h-screen grid place-items-center bg-slate-950 text-white p-6"><div className="text-center"><h1 className="text-2xl font-bold">Access denied</h1><p className="mt-2 text-slate-400">Your account is not an authorized church administrator.</p></div></div>
  }
  return <>{children}</>
}
