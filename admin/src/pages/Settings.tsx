import { FormEvent, useEffect, useState } from 'react'
import { Save } from 'lucide-react'
import { supabase } from '../lib/supabase'

const defaults: any = {
  church_name: 'The Neighbourhood Church',
  tagline: 'Where Faith Meets Family.',
  email: '',
  phone: '',
  whatsapp: '',
  address: '',
  map_embed: '',
  facebook: '',
  instagram: '',
  twitter: '',
  youtube: '',
  giving_ngn_enabled: true,
  giving_usd_enabled: true,
  default_giving_currency: 'NGN',
  default_event_registration_enabled: true,
  live_service_enabled: false,
  live_video_url: '',
  service_times: [
    { day: 'Sunday', time: '9:00 AM & 11:30 AM', label: 'Sunday Services' },
    { day: 'Wednesday', time: '6:00 PM', label: 'Midweek Service' },
    { day: 'Friday', time: '6:30 PM', label: 'Youth Night' },
  ],
}

const keys = Object.keys(defaults)

export default function Settings() {
  const [settings, setSettings] = useState<any>(defaults)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')

  useEffect(() => {
    let mounted = true

    ;(async () => {
      try {
        const { data, error } = await supabase.from('site_settings').select('key,value')
        if (error) throw error

        const next = { ...defaults }
        for (const row of data || []) {
          if (keys.includes(row.key)) next[row.key] = row.value
        }

        if (mounted) setSettings(next)
      } catch (error) {
        if (mounted) setMsg(error instanceof Error ? error.message : 'Unable to load settings')
      } finally {
        if (mounted) setLoading(false)
      }
    })()

    return () => {
      mounted = false
    }
  }, [])

  function set(key: string, value: any) {
    setSettings((current: any) => ({ ...current, [key]: value }))
  }

  function updateServiceTime(index: number, field: string, value: string) {
    setSettings((current: any) => ({
      ...current,
      service_times: (current.service_times || []).map((item: any, i: number) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }))
  }

  async function save(e: FormEvent) {
    e.preventDefault()
    setSaving(true)
    setMsg('')

    try {
      for (const key of keys) {
        const { error } = await supabase.from('site_settings').upsert({
          key,
          value: settings[key],
          updated_at: new Date().toISOString(),
        })
        if (error) throw error
      }
      setMsg('Settings saved successfully. Changes are now used by the public website.')
    } catch (error) {
      setMsg(error instanceof Error ? error.message : 'Unable to save settings')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div>Loading settings…</div>

  return (
    <div>
      <h1 className="text-2xl font-bold">Settings</h1>
      <p className="text-slate-500 mt-1">Manage the church information and defaults used across the public website.</p>

      <form onSubmit={save} className="mt-6 max-w-4xl space-y-5">
        <section className="bg-white border rounded-xl p-6 space-y-4">
          <h2 className="font-semibold">Church information</h2>
          {[['church_name', 'Church name'], ['tagline', 'Tagline'], ['email', 'Contact email'], ['phone', 'Phone'], ['whatsapp', 'WhatsApp'], ['address', 'Address'], ['map_embed', 'Google Maps embed URL']].map(([key, label]) => (
            <label key={key} className="block text-sm">
              {label}
              <input className="mt-1 w-full border rounded-lg px-3 py-2.5" value={settings[key] ?? ''} onChange={e => set(key, e.target.value)} />
            </label>
          ))}
        </section>

        <section className="bg-white border rounded-xl p-6 space-y-4">
          <h2 className="font-semibold">Social links</h2>
          <p className="text-xs text-slate-500">These links update the social icons in the public website footer.</p>
          {[['facebook', 'Facebook URL'], ['instagram', 'Instagram URL'], ['twitter', 'Twitter/X URL'], ['youtube', 'YouTube URL']].map(([key, label]) => (
            <label key={key} className="block text-sm">
              {label}
              <input type="url" className="mt-1 w-full border rounded-lg px-3 py-2.5" value={settings[key] ?? ''} onChange={e => set(key, e.target.value)} placeholder="https://..." />
            </label>
          ))}
        </section>

        <section className="bg-white border rounded-xl p-6 space-y-4">
          <h2 className="font-semibold">Live video</h2>
          <p className="text-xs text-slate-500">The public live-service banner is hidden unless Live service is enabled and a live video URL is provided.</p>
          <label className="flex gap-2 items-center text-sm">
            <input type="checkbox" checked={!!settings.live_service_enabled} onChange={e => set('live_service_enabled', e.target.checked)} />
            Show live service banner
          </label>
          <label className="block text-sm">
            Live video URL
            <input type="url" className="mt-1 w-full border rounded-lg px-3 py-2.5" value={settings.live_video_url ?? ''} onChange={e => set('live_video_url', e.target.value)} placeholder="https://www.youtube.com/watch?v=..." />
          </label>
        </section>

        <section className="bg-white border rounded-xl p-6">
          <h2 className="font-semibold mb-4">Service times</h2>
          {(settings.service_times || []).map((service: any, index: number) => (
            <div key={index} className="grid md:grid-cols-3 gap-2 mb-2">
              <input className="border rounded-lg px-3 py-2" value={service.day} placeholder="Day" onChange={e => updateServiceTime(index, 'day', e.target.value)} />
              <input className="border rounded-lg px-3 py-2" value={service.time} placeholder="Time" onChange={e => updateServiceTime(index, 'time', e.target.value)} />
              <input className="border rounded-lg px-3 py-2" value={service.label} placeholder="Label" onChange={e => updateServiceTime(index, 'label', e.target.value)} />
            </div>
          ))}
          <button type="button" className="text-sm text-blue-700" onClick={() => set('service_times', [...(settings.service_times || []), { day: '', time: '', label: '' }])}>+ Add service time</button>
        </section>

        <section className="bg-white border rounded-xl p-6 space-y-4">
          <h2 className="font-semibold">Giving & registration</h2>
          <label className="flex gap-2 items-center text-sm"><input type="checkbox" checked={!!settings.giving_ngn_enabled} onChange={e => set('giving_ngn_enabled', e.target.checked)} /> Enable ₦ Naira giving</label>
          <label className="flex gap-2 items-center text-sm"><input type="checkbox" checked={!!settings.giving_usd_enabled} onChange={e => set('giving_usd_enabled', e.target.checked)} /> Enable $ USD giving</label>
          <label className="block text-sm">Default giving currency<select className="mt-1 w-full border rounded-lg px-3 py-2.5" value={settings.default_giving_currency} onChange={e => set('default_giving_currency', e.target.value)}><option>NGN</option><option>USD</option></select></label>
          <label className="flex gap-2 items-center text-sm"><input type="checkbox" checked={!!settings.default_event_registration_enabled} onChange={e => set('default_event_registration_enabled', e.target.checked)} /> Enable event registration by default</label>
        </section>

        {msg && <div className="p-3 rounded-lg border bg-slate-50 text-sm">{msg}</div>}
        <button disabled={saving} className="bg-blue-700 text-white px-4 py-2.5 rounded-lg flex gap-2 items-center disabled:opacity-50"><Save size={17} />{saving ? 'Saving…' : 'Save settings'}</button>
      </form>
    </div>
  )
}
