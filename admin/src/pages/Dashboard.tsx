import { useEffect, useState } from 'react'
import { CalendarDays, FileText, HeartHandshake, Images, MessageSquare, Users } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'
import { hasPermission, type Permission } from '../lib/rbac'

const cards: readonly [string, string, typeof FileText, Permission][] = [
  ['sermons','Sermons',FileText,'sermons'],
  ['events','Events',CalendarDays,'events'],
  ['gallery_items','Gallery',Images,'gallery'],
  ['prayer_requests','Prayer Requests',MessageSquare,'forms'],
  ['event_registrations','Registrations',Users,'forms'],
  ['giving_transactions','Giving',HeartHandshake,'giving'],
]

export default function Dashboard() {
  const { profile } = useAuth()
  const [counts,setCounts]=useState<Record<string,number>>({})
  const visibleCards = cards.filter(([, , , permission]) => hasPermission(profile?.role, permission))
  useEffect(()=>{(async()=>{const entries=await Promise.all(visibleCards.map(async ([table])=>[table,(await supabase.from(table).select('*',{count:'exact',head:true})).count??0] as const));setCounts(Object.fromEntries(entries))})()},[profile?.role])
  return <div><div className="mb-6"><h1 className="text-2xl font-bold">Dashboard</h1><p className="text-slate-500 mt-1">Welcome, {profile?.full_name || 'Administrator'}. Your dashboard is limited to the modules available to your role.</p></div>
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">{visibleCards.map(([table,label,Icon])=><div key={table} className="bg-white rounded-xl border p-5"><div className="flex justify-between"><div><p className="text-sm text-slate-500">{label}</p><p className="text-3xl font-bold mt-2">{counts[table]??0}</p></div><Icon className="text-blue-700"/></div></div>)}</div>
    <div className="mt-6 bg-white border rounded-xl p-5"><h2 className="font-semibold">Your access</h2><p className="text-sm text-slate-500 mt-2">Only sections assigned to your role are shown in the navigation and protected from direct URL access.</p></div>
  </div>
}
