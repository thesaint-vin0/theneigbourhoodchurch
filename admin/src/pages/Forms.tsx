import { useEffect, useState } from 'react'
import { ChevronDown, ChevronUp, RefreshCw } from 'lucide-react'
import { supabase } from '../lib/supabase'

const tabs=['prayer_requests','contact_messages','volunteer_signups','event_registrations','newsletter_subscribers','plan_your_visit']
function display(v: unknown) { if (v === null || v === undefined || v === '') return '—'; if (typeof v === 'object') return JSON.stringify(v, null, 2); return String(v) }

export default function Forms(){
  const [tab,setTab]=useState(tabs[0]); const [rows,setRows]=useState<any[]>([]); const [expanded,setExpanded]=useState<string|null>(null); const [loading,setLoading]=useState(false)
  async function load(){setLoading(true);const {data}=await supabase.from(tab).select('*').order('created_at',{ascending:false}).limit(100);setRows(data??[]);setExpanded(null);setLoading(false)}
  useEffect(()=>{load()},[tab])
  return <div><div className="flex justify-between items-center mb-5"><div><h1 className="text-2xl font-bold">Forms & submissions</h1><p className="text-slate-500 mt-1">Long messages can be expanded so no submission is truncated.</p></div><button onClick={load} className="px-3 py-2 border rounded-lg flex gap-2 items-center"><RefreshCw size={16}/> Refresh</button></div>
    <div className="flex flex-wrap gap-2 mb-5">{tabs.map(x=><button key={x} onClick={()=>setTab(x)} className={`px-3 py-2 rounded-lg text-sm capitalize ${tab===x?'bg-blue-700 text-white':'bg-white border'}`}>{x.replaceAll('_',' ')}</button>)}</div>
    <div className="bg-white border rounded-xl overflow-hidden">{loading?<div className="p-8 text-center text-slate-500">Loading…</div>:!rows.length?<div className="p-8 text-center text-slate-500">No records.</div>:<div className="divide-y">{rows.map((r,i)=>{const id=r.id??String(i);const isOpen=expanded===id;const entries=Object.entries(r);return <div key={id} className="p-4"><button className="w-full text-left flex justify-between items-center gap-4" onClick={()=>setExpanded(isOpen?null:id)}><div><div className="font-medium">{r.name||r.email||r.subject||`Submission ${i+1}`}</div><div className="text-xs text-slate-500 mt-1">{r.created_at?new Date(r.created_at).toLocaleString():''}</div></div>{isOpen?<ChevronUp size={18}/>:<ChevronDown size={18}/>}</button>{isOpen&&<div className="mt-4 grid md:grid-cols-2 gap-3">{entries.map(([k,v])=><div key={k} className="rounded-lg bg-slate-50 border p-3"><div className="text-xs uppercase tracking-wide text-slate-500 mb-1">{k.replaceAll('_',' ')}</div><pre className="whitespace-pre-wrap break-words text-sm font-sans text-slate-800">{display(v)}</pre></div>)}</div>}</div>})}</div>}</div>
  </div>
}
