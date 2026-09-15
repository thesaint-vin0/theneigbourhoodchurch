import type { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { hasPermission, type Permission } from '../lib/rbac'

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { session, profile, loading } = useAuth()
  if (loading) return <div className="min-h-screen grid place-items-center bg-slate-950 text-white">Loading…</div>
  if (!session) return <Navigate to="/login" replace />
  if (!profile || !profile.role) {
    return <div className="min-h-screen grid place-items-center bg-slate-950 text-white p-6"><div className="text-center"><h1 className="text-2xl font-bold">Access denied</h1><p className="mt-2 text-slate-400">Your account does not have a church administrator role.</p></div></div>
  }
  return <>{children}</>
}

export function RoleRoute({ permission, children }: { permission: Permission; children: ReactNode }) {
  const { profile } = useAuth()
  const location = useLocation()
  if (!hasPermission(profile?.role, permission)) {
    if (location.pathname === '/') return <Navigate to="/" replace />
    return <div className="min-h-[60vh] grid place-items-center p-6"><div className="max-w-md text-center"><h1 className="text-2xl font-bold">Access denied</h1><p className="mt-2 text-slate-500">Your role does not have permission to access this section.</p><button onClick={() => window.history.back()} className="mt-5 px-4 py-2 rounded-lg bg-slate-900 text-white">Go back</button></div></div>
  }
  return <>{children}</>
}
