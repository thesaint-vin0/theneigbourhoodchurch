import { useEffect, useState } from 'react'
import { CalendarDays, FileText, HeartHandshake, Images, MessageSquare, Users } from 'lucide-react'
import { supabase } from '../lib/supabase'

const cards = [
  ['sermons','Sermons',FileText],['events','Events',CalendarDays],['gallery_items','Gallery',Images],
  ['prayer_requests','Prayer Requests',MessageSquare],['event_registrations','Registrations',Users],['giving_transactions','Giving',HeartHandshake]
] as const

export default function Dashboard() {
  const [counts,setCounts]=useState<Record<string,number>>({})
  useEffect(()=>{(async()=>{const entries=await Promise.all(cards.map(async ([table])=>[table,(await supabase.from(table).select('*',{count:'exact',head:true})).count??0] as const));setCounts(Object.fromEntries(entries))})()},[])
  return <div><div className="mb-6"><h1 className="text-2xl font-bold">Dashboard</h1><p className="text-slate-500 mt-1">Manage the content and activity of the public church website.</p></div>
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">{cards.map(([table,label,Icon])=><div key={table} className="bg-white rounded-xl border p-5"><div className="flex justify-between"><div><p className="text-sm text-slate-500">{label}</p><p className="text-3xl font-bold mt-2">{counts[table]??0}</p></div><Icon className="text-blue-700"/></div></div>)}</div>
    <div className="mt-6 bg-white border rounded-xl p-5"><h2 className="font-semibold">Content flow</h2><p className="text-sm text-slate-500 mt-2">Create or edit sermons, events and gallery items here. The public website will read the same Supabase content tables once its static data sources are migrated.</p></div>
  </div>
}
