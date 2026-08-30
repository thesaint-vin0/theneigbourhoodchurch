-- TNC CMS foundation.
-- Run after the existing 20260715213507_create_church_tables.sql migration.
-- This migration deliberately does NOT drop the existing public-form tables.

create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  role text not null default 'editor' check (role in ('super_admin','admin','editor')),
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.sermons (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  speaker text not null,
  date date not null,
  category text not null,
  scripture text,
  description text,
  image_url text,
  youtube_id text,
  video_url text,
  audio_url text,
  notes_url text,
  featured boolean not null default false,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  date date not null,
  end_date date,
  time text not null,
  location text not null,
  description text,
  image_url text,
  category text not null,
  registration_required boolean not null default false,
  registration_enabled boolean not null default false,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.gallery_items (
  id uuid primary key default gen_random_uuid(),
  type text not null default 'photo' check (type in ('photo','video')),
  title text not null,
  category text not null,
  image_url text,
  video_id text,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.giving_transactions (
  id uuid primary key default gen_random_uuid(),
  name text,
  email text,
  amount numeric(14,2) not null check (amount > 0),
  currency text not null default 'NGN',
  fund text not null default 'General Giving',
  status text not null default 'pending',
  reference text unique,
  paystack_transaction_id bigint,
  paid_at timestamptz,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.site_settings (
  key text primary key,
  value jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create index if not exists sermons_date_idx on public.sermons(date desc);
create index if not exists events_date_idx on public.events(date asc);
create index if not exists gallery_created_idx on public.gallery_items(created_at desc);
create index if not exists giving_created_idx on public.giving_transactions(created_at desc);

alter table public.profiles enable row level security;
alter table public.sermons enable row level security;
alter table public.events enable row level security;
alter table public.gallery_items enable row level security;
alter table public.giving_transactions enable row level security;
alter table public.site_settings enable row level security;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid()
      and role in ('super_admin','admin','editor')
  );
$$;

create or replace function public.is_editor()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid()
      and role in ('super_admin','admin','editor')
  );
$$;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles(id,email,full_name,role)
  values (new.id,new.email,coalesce(new.raw_user_meta_data->>'full_name',''),'editor')
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

-- Public content can be read only when published.
drop policy if exists sermons_public_read on public.sermons;
create policy sermons_public_read on public.sermons for select to anon, authenticated using (published = true);

drop policy if exists events_public_read on public.events;
create policy events_public_read on public.events for select to anon, authenticated using (published = true);

drop policy if exists gallery_public_read on public.gallery_items;
create policy gallery_public_read on public.gallery_items for select to anon, authenticated using (published = true);

-- Admin/editor management.
drop policy if exists sermons_admin_all on public.sermons;
create policy sermons_admin_all on public.sermons for all to authenticated using (public.is_editor()) with check (public.is_editor());

drop policy if exists events_admin_all on public.events;
create policy events_admin_all on public.events for all to authenticated using (public.is_editor()) with check (public.is_editor());

drop policy if exists gallery_admin_all on public.gallery_items;
create policy gallery_admin_all on public.gallery_items for all to authenticated using (public.is_editor()) with check (public.is_editor());

drop policy if exists profiles_self_read on public.profiles;
create policy profiles_self_read on public.profiles for select to authenticated using (id = auth.uid());

drop policy if exists profiles_admin_read on public.profiles;
create policy profiles_admin_read on public.profiles for select to authenticated using (public.is_admin());

drop policy if exists giving_admin_read on public.giving_transactions;
create policy giving_admin_read on public.giving_transactions for select to authenticated using (public.is_admin());

drop policy if exists site_settings_public_read on public.site_settings;
create policy site_settings_public_read on public.site_settings for select to anon, authenticated using (true);

drop policy if exists site_settings_admin_all on public.site_settings;
create policy site_settings_admin_all on public.site_settings for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- Public users may never read/write giving_transactions directly.
-- The Paystack Edge Functions use service-role credentials server-side.

-- Storage bucket for public church media. Upload/delete remains policy protected.
insert into storage.buckets (id, name, public)
values ('church-media','church-media',true)
on conflict (id) do update set public = true;

drop policy if exists church_media_public_read on storage.objects;
create policy church_media_public_read
on storage.objects for select
to anon, authenticated
using (bucket_id = 'church-media');

drop policy if exists church_media_admin_insert on storage.objects;
create policy church_media_admin_insert
on storage.objects for insert
to authenticated
with check (bucket_id = 'church-media' and public.is_editor());

drop policy if exists church_media_admin_update on storage.objects;
create policy church_media_admin_update
on storage.objects for update
to authenticated
using (bucket_id = 'church-media' and public.is_editor())
with check (bucket_id = 'church-media' and public.is_editor());

drop policy if exists church_media_admin_delete on storage.objects;
create policy church_media_admin_delete
on storage.objects for delete
to authenticated
using (bucket_id = 'church-media' and public.is_editor());

-- Realtime for CMS content.
do $$
begin
  begin alter publication supabase_realtime add table public.sermons; exception when duplicate_object then null; end;
  begin alter publication supabase_realtime add table public.events; exception when duplicate_object then null; end;
  begin alter publication supabase_realtime add table public.gallery_items; exception when duplicate_object then null; end;
end $$;
