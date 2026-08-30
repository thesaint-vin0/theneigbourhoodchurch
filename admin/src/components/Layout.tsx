import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { BarChart3, CalendarDays, Church, FileText, GalleryHorizontal, HeartHandshake, Images, LogOut, Menu, Settings, X } from 'lucide-react'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { UserCircle } from 'lucide-react'

const links = [
  ['/','Dashboard',BarChart3],
  ['/sermons','Sermons',FileText],
  ['/events','Events',CalendarDays],
  ['/gallery','Gallery',GalleryHorizontal],
  ['/media','Media',Images],
  ['/forms','Forms',Church],
  ['/giving','Giving',HeartHandshake],
  ['/admin-management','Admin Management',Settings],['/settings','Settings',Settings],['/account','My Account',UserCircle],
] as const

export function Layout() {
  const { profile, signOut } = useAuth()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  async function logout() { await signOut(); navigate('/login') }
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-slate-950 text-white transition-transform md:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-16 flex items-center justify-between px-5 border-b border-white/10">
          <div className="font-semibold tracking-wide">TNC ADMIN</div>
          <button className="md:hidden" onClick={() => setOpen(false)}><X size={20}/></button>
        </div>
        <nav className="p-3 space-y-1">
          {links.map(([to,label,Icon]) => <NavLink key={to} to={to} end={to === '/'} onClick={() => setOpen(false)} className={({isActive}) => `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm ${isActive ? 'bg-white text-slate-950' : 'text-slate-300 hover:bg-white/10'}`}><Icon size={18}/>{label}</NavLink>)}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
          <div className="text-xs text-slate-400 truncate">{profile?.email}</div>
          <div className="text-xs text-slate-500 mt-1 capitalize">{profile?.role?.replace('_',' ')}</div>
          <button onClick={logout} className="mt-3 flex items-center gap-2 text-sm text-slate-300 hover:text-white"><LogOut size={16}/> Sign out</button>
        </div>
      </aside>
      <div className="md:pl-64">
        <header className="h-16 bg-white border-b flex items-center px-4 md:px-6 sticky top-0 z-30">
          <button className="md:hidden mr-3" onClick={() => setOpen(true)}><Menu/></button>
          <div className="text-sm text-slate-500">The Neighbourhood Church</div>
        </header>
        <main className="p-4 md:p-6 max-w-7xl mx-auto"><Outlet/></main>
      </div>
    </div>
  )
}
