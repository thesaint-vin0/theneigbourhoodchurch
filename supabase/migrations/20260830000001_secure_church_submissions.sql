-- Production security hardening for private submissions.
-- Public visitors may INSERT. Only authenticated church admins may read/change/delete.

create or replace function public.is_church_admin()
returns boolean
language sql stable security definer set search_path = public
as $$ select exists (select 1 from public.profiles where id = auth.uid() and role in ('super_admin','admin','editor')); $$;

do $$ declare t text; p record; begin
  foreach t in array array['prayer_requests','newsletter_subscribers','event_registrations','volunteer_signups','contact_messages','giving_records','plan_your_visit'] loop
    execute format('alter table public.%I enable row level security', t);
    for p in select pol.polname from pg_policy pol join pg_class c on c.oid=pol.polrelid join pg_namespace n on n.oid=c.relnamespace where n.nspname='public' and c.relname=t loop
      execute format('drop policy if exists %I on public.%I', p.polname, t);
    end loop;
    execute format('create policy %I on public.%I for insert to anon, authenticated with check (true)', 'public_insert_'||t, t);
    execute format('create policy %I on public.%I for select to authenticated using (public.is_church_admin())', 'admin_select_'||t, t);
    execute format('create policy %I on public.%I for update to authenticated using (public.is_church_admin()) with check (public.is_church_admin())', 'admin_update_'||t, t);
    execute format('create policy %I on public.%I for delete to authenticated using (public.is_church_admin())', 'admin_delete_'||t, t);
  end loop;
end $$;
