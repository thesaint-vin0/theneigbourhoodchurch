-- CMS management for pastors and editable home-page content.
create table if not exists public.pastors (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text not null,
  bio text not null default '',
  image_url text,
  socials jsonb not null default '[]'::jsonb,
  sort_order integer not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.pastors enable row level security;
drop policy if exists pastors_public_read on public.pastors;
create policy pastors_public_read on public.pastors for select to anon, authenticated using (published = true);
drop policy if exists pastors_admin_all on public.pastors;
create policy pastors_admin_all on public.pastors for all to authenticated using (public.is_editor()) with check (public.is_editor());

create index if not exists pastors_sort_order_idx on public.pastors(sort_order asc);

insert into public.pastors(name,role,bio,image_url,socials,sort_order,published)
select v.name,v.role,v.bio,v.image_url,v.socials::jsonb,v.sort_order,true
from (values
('Pastor David Okoye','Lead Pastor','Pastor David founded The Neighbourhood Church in 2008 with a vision to create a community where everyone feels they belong. With over 20 years of ministry experience, he brings warmth, wisdom, and a deep love for people.','https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=800','[{"label":"Twitter","url":"#","icon":"twitter"},{"label":"Instagram","url":"#","icon":"instagram"},{"label":"Facebook","url":"#","icon":"facebook"}]',0),
('Pastor Sarah Okoye','Associate Pastor','Pastor Sarah leads our women’s ministry and oversees pastoral care. Her compassionate heart and gift of teaching have touched countless lives across our community.','https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=800','[{"label":"Twitter","url":"#","icon":"twitter"},{"label":"Instagram","url":"#","icon":"instagram"},{"label":"Facebook","url":"#","icon":"facebook"}]',1),
('Pastor Michael Adeyemi','Youth Pastor','Pastor Michael leads our vibrant youth ministry with energy and passion. He is dedicated to helping young people discover their identity and purpose in Christ.','https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=800','[{"label":"Twitter","url":"#","icon":"twitter"},{"label":"Instagram","url":"#","icon":"instagram"}]',2),
('Pastor Grace Bello','Worship Pastor','Pastor Grace oversees worship and the creative arts. Her heart for God’s presence creates an atmosphere where people encounter the love of the Father.','https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=800','[{"label":"Instagram","url":"#","icon":"instagram"},{"label":"Facebook","url":"#","icon":"facebook"}]',3)
) v(name,role,bio,image_url,socials,sort_order)
where not exists (select 1 from public.pastors);

insert into public.site_settings(key,value) values
 ('daily_verse_text','"For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future."'::jsonb),
 ('daily_verse_ref','"Jeremiah 29:11"'::jsonb),
 ('memory_verse_text','"And let us consider how we may spur one another on toward love and good deeds, not giving up meeting together, as some are in the habit of doing, but encouraging one another."'::jsonb),
 ('memory_verse_ref','"Hebrews 10:24–25"'::jsonb),
 ('announcements','[{"title":"Water Baptism Sunday","date":"July 28","text":"Sign up at the info desk if you’d like to be baptized."},{"title":"Volunteer Drive","date":"August 3","text":"Join a team and serve with us. Orientation after second service."},{"title":"Back to School Giveaway","date":"August 25","text":"Donating school supplies for local families. Drop off at the lobby."}]'::jsonb)
on conflict (key) do nothing;

do $$ begin
  begin alter publication supabase_realtime add table public.pastors; exception when duplicate_object then null; end;
end $$;

insert into public.site_settings(key,value) values
 ('whatsapp','"+234 801 234 5678"'::jsonb),
 ('map_embed','"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31688.42189184!2d3.3792!3d6.5244!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMzEnMjcuOCJOIDPCsDIyJzQ1LjEiRQ!5e0!3m2!1sen!2sng!4v1700000000000"'::jsonb),
 ('service_times','[{"day":"Sunday","time":"9:00 AM & 11:30 AM","label":"Sunday Services"},{"day":"Wednesday","time":"6:00 PM","label":"Midweek Service"},{"day":"Friday","time":"6:30 PM","label":"Youth Night"}]'::jsonb)
on conflict (key) do nothing;
