import { supabase } from './supabase';
import { churchInfo as fallbackChurchInfo } from '../data/site';
import { dailyVerses as fallbackDailyVerses, memoryVerse as fallbackMemoryVerse, announcements as fallbackAnnouncements } from '../data/church';
import { pastors as fallbackPastors, Pastor } from '../data/pastors';

export interface SiteContent {
  facebook: string;
  instagram: string;
  twitter: string;
  youtube: string;
  whatsapp: string;
  church_name: string;
  tagline: string;
  email: string;
  phone: string;
  address: string;
  map_embed: string;
  service_times: { day:string; time:string; label:string }[];
}

export interface HomeContent {
  daily_verse_text: string;
  daily_verse_ref: string;
  memory_verse_text: string;
  memory_verse_ref: string;
  announcements: { title: string; date: string; text: string }[];
}

const defaults: SiteContent = {
  church_name: fallbackChurchInfo.name,
  tagline: fallbackChurchInfo.tagline,
  email: fallbackChurchInfo.email,
  phone: fallbackChurchInfo.phone,
  address: fallbackChurchInfo.address,
  whatsapp: fallbackChurchInfo.whatsapp,
  map_embed: fallbackChurchInfo.mapEmbed,
  facebook: fallbackChurchInfo.socials.find(s => s.icon === 'facebook')?.url || '',
  instagram: fallbackChurchInfo.socials.find(s => s.icon === 'instagram')?.url || '',
  twitter: fallbackChurchInfo.socials.find(s => s.icon === 'twitter')?.url || '',
  youtube: fallbackChurchInfo.socials.find(s => s.icon === 'youtube')?.url || '',
  service_times: fallbackChurchInfo.serviceTimes,
};

export const defaultHomeContent: HomeContent = {
  daily_verse_text: fallbackDailyVerses[0].text,
  daily_verse_ref: fallbackDailyVerses[0].ref,
  memory_verse_text: fallbackMemoryVerse.text,
  memory_verse_ref: fallbackMemoryVerse.ref,
  announcements: fallbackAnnouncements,
};

export async function getSiteContent(): Promise<SiteContent> {
  const { data } = await supabase.from('site_settings').select('key,value');
  const result = { ...defaults } as SiteContent;
  for (const row of data || []) {
    if (row.key in result) (result as any)[row.key] = typeof row.value === 'string' ? row.value : row.value;
  }
  return result;
}

export async function getHomeContent(): Promise<HomeContent> {
  const { data } = await supabase.from('site_settings').select('key,value');
  const result: HomeContent = { ...defaultHomeContent, announcements: [...defaultHomeContent.announcements] };
  for (const row of data || []) {
    if (row.key === 'daily_verse_text') result.daily_verse_text = String(row.value || '');
    if (row.key === 'daily_verse_ref') result.daily_verse_ref = String(row.value || '');
    if (row.key === 'memory_verse_text') result.memory_verse_text = String(row.value || '');
    if (row.key === 'memory_verse_ref') result.memory_verse_ref = String(row.value || '');
    if (row.key === 'announcements' && Array.isArray(row.value)) result.announcements = row.value;
  }
  return result;
}

export async function getPastors(): Promise<Pastor[]> {
  const { data, error } = await supabase.from('pastors').select('*').eq('published', true).order('sort_order', { ascending: true });
  if (error || !data?.length) return fallbackPastors;
  return data.map((p: any) => ({
    id: p.id,
    name: p.name,
    role: p.role,
    bio: p.bio || '',
    image: p.image_url || '',
    socials: Array.isArray(p.socials) ? p.socials : [],
  }));
}
