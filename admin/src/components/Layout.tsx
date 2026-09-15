import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { BarChart3, CalendarDays, Church, FileText, GalleryHorizontal, HeartHandshake, Images, LogOut, Menu, Settings, X, UserCircle, Users, Home } from 'lucide-react'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { hasPermission, roleLabels, type Permission } from '../lib/rbac'

type LinkItem = readonly [string, string, typeof BarChart3, Permission]
const links: LinkItem[] = [
  ['/','Dashboard',BarChart3,'dashboard'],
  ['/sermons','Sermons',FileText,'sermons'],
  ['/events','Events',CalendarDays,'events'],
  ['/gallery','Gallery',GalleryHorizontal,'gallery'],
  ['/media','Media',Images,'media'],
  ['/forms','Forms',Church,'forms'],
  ['/giving','Giving',HeartHandshake,'giving'],
  ['/admin-management','Admin Management',Settings,'admin-management'],
  ['/settings','Settings',Settings,'settings'],
  ['/pastors','Pastors',Users,'pastors'],
  ['/home-content','Home Page',Home,'home-content'],
  ['/account','My Account',UserCircle,'account'],
]

export function Layout() {
  const { profile, signOut } = useAuth()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  async function logout() { await signOut(); navigate('/login') }
  const visibleLinks = links.filter(([, , , permission]) => hasPermission(profile?.role, permission))

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-slate-950 text-white transition-transform md:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-16 flex items-center justify-between px-5 border-b border-white/10">
          <div className="font-semibold tracking-wide">TNC ADMIN</div>
          <button className="md:hidden" onClick={() => setOpen(false)}><X size={20}/></button>
        </div>
        <nav className="p-3 space-y-1">
          {visibleLinks.map(([to,label,Icon]) => <NavLink key={to} to={to} end={to === '/'} onClick={() => setOpen(false)} className={({isActive}) => `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm ${isActive ? 'bg-white text-slate-950' : 'text-slate-300 hover:bg-white/10'}`}><Icon size={18}/>{label}</NavLink>)}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
          <div className="text-sm text-white truncate">{profile?.full_name || profile?.email}</div>
          <div className="text-xs text-slate-400 mt-1">{profile?.role ? roleLabels[profile.role] : ''}</div>
          <button onClick={logout} className="mt-3 flex items-center gap-2 text-sm text-slate-300 hover:text-white"><LogOut size={16}/> Sign out</button>
        </div>
      </aside>
      <div className="md:pl-64">
        <header className="h-16 bg-white border-b flex items-center px-4 md:px-6 sticky top-0 z-30">
          <button className="md:hidden mr-3" onClick={() => setOpen(true)}><Menu/></button>
          <div><div className="text-sm text-slate-500">The Neighbourhood Church</div><div className="text-xs text-slate-400">{profile?.role ? roleLabels[profile.role] : ''}</div></div>
        </header>
        <main className="p-4 md:p-6 max-w-7xl mx-auto"><Outlet/></main>
      </div>
    </div>
  )
}
