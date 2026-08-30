import { supabase } from './supabase'

export const MEDIA_BUCKET = 'church-media'

export async function uploadMedia(file: File, folder: string) {
  const safeName = file.name.toLowerCase().replace(/[^a-z0-9._-]+/g, '-').replace(/^-+|-+$/g, '')
  const path = `${folder}/${crypto.randomUUID()}-${safeName || 'file'}`
  const { error } = await supabase.storage.from(MEDIA_BUCKET).upload(path, file, {
    upsert: false,
    contentType: file.type || undefined,
  })
  if (error) throw error
  return supabase.storage.from(MEDIA_BUCKET).getPublicUrl(path).data.publicUrl
}

export async function removeMediaByUrl(url: string | null | undefined) {
  if (!url) return
  const marker = `/storage/v1/object/public/${MEDIA_BUCKET}/`
  const index = url.indexOf(marker)
  if (index === -1) return
  const path = decodeURIComponent(url.slice(index + marker.length))
  await supabase.storage.from(MEDIA_BUCKET).remove([path])
}
