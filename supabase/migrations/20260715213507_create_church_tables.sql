/*
# Create church engagement tables (single-tenant, no auth)

1. New Tables
- `prayer_requests`: stores prayer submissions from the Prayer page form.
  - id (uuid pk), name, email, phone, category, message, anonymous (bool), created_at.
- `newsletter_subscribers`: stores email subscriptions from the newsletter form.
  - id (uuid pk), email (unique), created_at.
- `event_registrations`: stores event registration submissions.
  - id (uuid pk), event_id, name, email, phone, guests (int), created_at.
- `volunteer_signups`: stores volunteer registration submissions.
  - id (uuid pk), name, email, phone, ministry, message, created_at.
- `contact_messages`: stores contact form submissions.
  - id (uuid pk), name, email, subject, message, created_at.
- `giving_records`: stores giving form submissions (no payment processing yet).
  - id (uuid pk), name, email, fund, amount, frequency, created_at.
- `plan_your_visit`: stores visit planning form submissions.
  - id (uuid pk), name, email, phone, visit_date, service_time, guests, created_at.

2. Security
- RLS enabled on all tables.
- All tables allow anon + authenticated CRUD because this is a no-auth public church website.
- USING (true) / WITH CHECK (true) is acceptable here because the data is intentionally
  public-facing submissions (no user accounts, no ownership concept).
*/

-- Prayer requests
CREATE TABLE IF NOT EXISTS prayer_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text,
  email text,
  phone text,
  category text NOT NULL,
  message text NOT NULL,
  anonymous boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE prayer_requests ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_select_prayer" ON prayer_requests;
CREATE POLICY "anon_select_prayer" ON prayer_requests FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "anon_insert_prayer" ON prayer_requests;
CREATE POLICY "anon_insert_prayer" ON prayer_requests FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "anon_update_prayer" ON prayer_requests;
CREATE POLICY "anon_update_prayer" ON prayer_requests FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "anon_delete_prayer" ON prayer_requests;
CREATE POLICY "anon_delete_prayer" ON prayer_requests FOR DELETE TO anon, authenticated USING (true);

-- Newsletter subscribers
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_select_newsletter" ON newsletter_subscribers;
CREATE POLICY "anon_select_newsletter" ON newsletter_subscribers FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "anon_insert_newsletter" ON newsletter_subscribers;
CREATE POLICY "anon_insert_newsletter" ON newsletter_subscribers FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "anon_update_newsletter" ON newsletter_subscribers;
CREATE POLICY "anon_update_newsletter" ON newsletter_subscribers FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "anon_delete_newsletter" ON newsletter_subscribers;
CREATE POLICY "anon_delete_newsletter" ON newsletter_subscribers FOR DELETE TO anon, authenticated USING (true);

-- Event registrations
CREATE TABLE IF NOT EXISTS event_registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id text NOT NULL,
  event_title text,
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  guests integer DEFAULT 1,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE event_registrations ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_select_events_reg" ON event_registrations;
CREATE POLICY "anon_select_events_reg" ON event_registrations FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "anon_insert_events_reg" ON event_registrations;
CREATE POLICY "anon_insert_events_reg" ON event_registrations FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "anon_update_events_reg" ON event_registrations;
CREATE POLICY "anon_update_events_reg" ON event_registrations FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "anon_delete_events_reg" ON event_registrations;
CREATE POLICY "anon_delete_events_reg" ON event_registrations FOR DELETE TO anon, authenticated USING (true);

-- Volunteer signups
CREATE TABLE IF NOT EXISTS volunteer_signups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  ministry text NOT NULL,
  message text,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE volunteer_signups ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_select_volunteer" ON volunteer_signups;
CREATE POLICY "anon_select_volunteer" ON volunteer_signups FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "anon_insert_volunteer" ON volunteer_signups;
CREATE POLICY "anon_insert_volunteer" ON volunteer_signups FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "anon_update_volunteer" ON volunteer_signups;
CREATE POLICY "anon_update_volunteer" ON volunteer_signups FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "anon_delete_volunteer" ON volunteer_signups;
CREATE POLICY "anon_delete_volunteer" ON volunteer_signups FOR DELETE TO anon, authenticated USING (true);

-- Contact messages
CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subject text,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_select_contact" ON contact_messages;
CREATE POLICY "anon_select_contact" ON contact_messages FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "anon_insert_contact" ON contact_messages;
CREATE POLICY "anon_insert_contact" ON contact_messages FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "anon_update_contact" ON contact_messages;
CREATE POLICY "anon_update_contact" ON contact_messages FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "anon_delete_contact" ON contact_messages;
CREATE POLICY "anon_delete_contact" ON contact_messages FOR DELETE TO anon, authenticated USING (true);

-- Giving records
CREATE TABLE IF NOT EXISTS giving_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text,
  email text,
  fund text NOT NULL,
  amount numeric NOT NULL,
  frequency text DEFAULT 'one-time',
  created_at timestamptz DEFAULT now()
);
ALTER TABLE giving_records ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_select_giving" ON giving_records;
CREATE POLICY "anon_select_giving" ON giving_records FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "anon_insert_giving" ON giving_records;
CREATE POLICY "anon_insert_giving" ON giving_records FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "anon_update_giving" ON giving_records;
CREATE POLICY "anon_update_giving" ON giving_records FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "anon_delete_giving" ON giving_records;
CREATE POLICY "anon_delete_giving" ON giving_records FOR DELETE TO anon, authenticated USING (true);

-- Plan your visit
CREATE TABLE IF NOT EXISTS plan_your_visit (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  visit_date date,
  service_time text,
  guests integer DEFAULT 1,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE plan_your_visit ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_select_visit" ON plan_your_visit;
CREATE POLICY "anon_select_visit" ON plan_your_visit FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "anon_insert_visit" ON plan_your_visit;
CREATE POLICY "anon_insert_visit" ON plan_your_visit FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "anon_update_visit" ON plan_your_visit;
CREATE POLICY "anon_update_visit" ON plan_your_visit FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "anon_delete_visit" ON plan_your_visit;
CREATE POLICY "anon_delete_visit" ON plan_your_visit FOR DELETE TO anon, authenticated USING (true);
