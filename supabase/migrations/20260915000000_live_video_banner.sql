-- Control the public live-service banner from Admin > Settings.
insert into public.site_settings(key, value) values
  ('live_service_enabled', 'false'::jsonb),
  ('live_video_url', '""'::jsonb)
on conflict (key) do nothing;
