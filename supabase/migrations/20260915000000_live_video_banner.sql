-- Control the public live-service banner from Admin > Settings.
-- Add CMS controls for the public live-service banner.
-- The banner is hidden by default.
insert into public.site_settings (key, value) values
  ('live_service_enabled', 'false'::jsonb),
  ('live_video_url', '""'::jsonb)
on conflict (key) do nothing;
