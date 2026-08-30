export type Role = 'super_admin' | 'admin' | 'editor'

export interface Profile {
  id: string
  email: string | null
  full_name: string | null
  role: Role
  avatar_url?: string | null
}

export interface Sermon {
  id: string
  title: string
  speaker: string
  date: string
  category: string
  scripture: string
  description: string
  image_url: string | null
  youtube_id: string | null
  video_url: string | null
  audio_url: string | null
  notes_url: string | null
  featured: boolean
  published: boolean
}

export interface ChurchEvent {
  id: string
  title: string
  date: string
  end_date: string | null
  time: string
  location: string
  description: string
  image_url: string | null
  category: string
  registration_required: boolean
  registration_enabled: boolean
  published: boolean
}

export interface GalleryItem {
  id: string
  type: 'photo' | 'video'
  title: string
  category: string
  image_url: string | null
  video_id: string | null
  published: boolean
}

export interface GivingTransaction {
  id: string
  name: string | null
  email: string | null
  amount: number
  currency: string
  fund: string
  status: string
  reference: string | null
  created_at: string
}
