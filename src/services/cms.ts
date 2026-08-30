import { supabase } from './supabase';

export interface CmsSermon { id:string; title:string; speaker:string; date:string; category:string; scripture:string; description:string; image:string; youtubeId:string; videoUrl:string; audioUrl:string; notesUrl:string; featured:boolean; }
export interface CmsEvent { id:string; title:string; date:string; endDate?:string; time:string; location:string; description:string; image:string; category:string; registrationRequired:boolean; registrationEnabled?:boolean; }
export interface CmsGalleryItem { id:string; type:'photo'|'video'; title:string; category:string; image:string; videoId?:string; }

const fallback = { sermons: [] as CmsSermon[], events: [] as CmsEvent[], gallery: [] as CmsGalleryItem[] };

export async function getSermons(): Promise<CmsSermon[]> {
  const { data, error } = await supabase.from('sermons').select('*').eq('published', true).order('date', { ascending:false });
  if (error || !data?.length) return fallback.sermons;
  return data.map((x:any)=>({id:x.id,title:x.title,speaker:x.speaker,date:x.date,category:x.category,scripture:x.scripture||'',description:x.description||'',image:x.image_url||'',youtubeId:x.youtube_id||'',videoUrl:x.video_url||'',audioUrl:x.audio_url||'',notesUrl:x.notes_url||'',featured:x.featured}));
}
export async function getEvents(): Promise<CmsEvent[]> {
  const { data, error } = await supabase.from('events').select('*').eq('published', true).order('date', { ascending:true });
  if (error || !data?.length) return fallback.events;
  return data.map((x:any)=>({id:x.id,title:x.title,date:x.date,endDate:x.end_date||undefined,time:x.time,location:x.location,description:x.description||'',image:x.image_url||'',category:x.category,registrationRequired:x.registration_required,registrationEnabled:x.registration_enabled}));
}
export async function getGallery(): Promise<CmsGalleryItem[]> {
  const { data, error } = await supabase.from('gallery_items').select('*').eq('published', true).order('created_at', { ascending:false });
  if (error || !data?.length) return fallback.gallery;
  return data.map((x:any)=>({id:x.id,type:x.type,title:x.title,category:x.category,image:x.image_url||'',videoId:x.video_id||undefined}));
}
export const sermonCategories = (items:CmsSermon[]) => ['All', ...Array.from(new Set(items.map(x=>x.category).filter(Boolean)))];
export const eventCategories = (items:CmsEvent[]) => ['All', ...Array.from(new Set(items.map(x=>x.category).filter(Boolean)))];
export const galleryCategories = (items:CmsGalleryItem[]) => ['All', ...Array.from(new Set(items.map(x=>x.category).filter(Boolean)))];
