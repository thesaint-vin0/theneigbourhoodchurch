import { useEffect, useState } from 'react'
import { FileAudio, FileText, FileVideo, Image as ImageIcon, RefreshCw, Trash2, Upload } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { MEDIA_BUCKET, uploadMedia } from '../lib/storage'

type MediaObject = { name: string; id: string | null; updated_at?: string | null; metadata?: { mimetype?: string; size?: number } | null }

const folders = ['gallery', 'sermons', 'events', 'pastors', 'pages', 'documents']

function iconFor(type?: string) {
  if (type?.startsWith('image/')) return ImageIcon
  if (type?.startsWith('video/')) return FileVideo
  if (type?.startsWith('audio/')) return FileAudio
  return FileText
}

export default function Media() {
  const [folder, setFolder] = useState('gallery')
  const [items, setItems] = useState<MediaObject[]>([])
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState('')

  async function load() {
    setBusy(true)
    setMessage('')
    const { data, error } = await supabase.storage.from(MEDIA_BUCKET).list(folder, { limit: 200, sortBy: { column: 'created_at', order: 'desc' } })
    if (error) setMessage(error.message)
    setItems((data ?? []) as MediaObject[])
    setBusy(false)
  }

  useEffect(() => { load() }, [folder])

  async function upload(files: FileList | null) {
    if (!files?.length) return
    setBusy(true)
    setMessage('')
    try {
      for (const file of Array.from(files)) await uploadMedia(file, folder)
      setMessage(`${files.length} file${files.length > 1 ? 's' : ''} uploaded.`)
      await load()
    } catch (e) {
      setMessage(e instanceof Error ? e.message : 'Upload failed')
    } finally { setBusy(false) }
  }

  async function remove(name: string) {
    if (!confirm(`Delete ${name}?`)) return
    const { error } = await supabase.storage.from(MEDIA_BUCKET).remove([`${folder}/${name}`])
    if (error) setMessage(error.message)
    else await load()
  }

  return <div>
    <div className="flex flex-wrap justify-between items-center gap-3 mb-6">
      <div><h1 className="text-2xl font-bold">Media Library</h1><p className="text-slate-500 mt-1">Upload and manage the files used by sermons, events and the gallery.</p></div>
      <div className="flex gap-2">
        <button onClick={load} className="px-3 py-2 border rounded-lg flex gap-2 items-center"><RefreshCw size={16}/> Refresh</button>
        <label className="bg-blue-700 text-white px-4 py-2 rounded-lg flex gap-2 items-center cursor-pointer"><Upload size={17}/> Upload<input hidden multiple type="file" onChange={e => upload(e.target.files)} /></label>
      </div>
    </div>
    <div className="flex flex-wrap gap-2 mb-5">{folders.map(x => <button key={x} onClick={() => setFolder(x)} className={`px-3 py-2 rounded-lg text-sm ${folder === x ? 'bg-blue-700 text-white' : 'bg-white border'}`}>{x}</button>)}</div>
    {message && <div className="mb-5 p-3 rounded-lg bg-slate-50 border text-sm">{message}</div>}
    {busy && <div className="text-sm text-slate-500 mb-4">Working…</div>}
    {!items.length && !busy ? <div className="bg-white border rounded-xl p-12 text-center text-slate-500">No files in <b>{folder}</b> yet. Upload one above.</div> : <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">{items.map(item => { const type=item.metadata?.mimetype; const Icon=iconFor(type); const url=supabase.storage.from(MEDIA_BUCKET).getPublicUrl(`${folder}/${item.name}`).data.publicUrl; return <div key={item.name} className="bg-white border rounded-xl overflow-hidden">{type?.startsWith('image/') ? <img src={url} className="aspect-video w-full object-cover"/> : <div className="aspect-video bg-slate-100 grid place-items-center"><Icon size={38} className="text-slate-400"/></div>}<div className="p-3"><div className="font-medium truncate" title={item.name}>{item.name}</div><div className="text-xs text-slate-500 mt-1">{type || 'File'} {item.metadata?.size ? `· ${(item.metadata.size / 1024 / 1024).toFixed(1)} MB` : ''}</div><div className="flex justify-end mt-3"><button onClick={() => remove(item.name)} className="text-red-600 p-2" title="Delete"><Trash2 size={17}/></button></div></div></div> })}</div>}
  </div>
}
