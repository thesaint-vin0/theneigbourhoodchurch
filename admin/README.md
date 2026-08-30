# TNC Admin — The Neighbourhood Church

This is the separate administration application intended to share the same Supabase project as `theneigbourhoodchurch`.

## What is included

- Supabase email/password admin login
- Role-aware admin access (`super_admin`, `admin`, `editor`)
- Dashboard
- Sermon CRUD
- Event CRUD
- Gallery CRUD
- Form/submission viewer
- Giving transaction viewer
- Protected Supabase Storage bucket
- Production-oriented RLS
- Paystack initialize/webhook Edge Functions
- NGN-first giving transaction model

## 1. Configure Supabase

First apply the existing church migration from the public website repository:

`supabase/migrations/20260715213507_create_church_tables.sql`

Then apply:

`supabase/migrations/20260830000000_tnc_cms.sql`

Do not keep the old public CRUD policies from the first migration in production for private submissions. They intentionally allow anonymous CRUD and are not suitable for the new admin architecture.

## 2. Create the first admin

Create a user in Supabase Dashboard:

Authentication → Users → Add user.

Then, after the trigger creates `profiles`, change that user's `profiles.role` to `super_admin` using the SQL editor:

```sql
update public.profiles
set role = 'super_admin'
where email = 'YOUR_ADMIN_EMAIL';
```

## 3. Local environment

Copy `.env.example` to `.env.local` and fill in the Supabase URL/key.

## 4. Run

```bash
npm install
npm run dev
```

## 5. Paystack

Store the secret key only as an Edge Function secret:

```bash
supabase secrets set PAYSTACK_SECRET_KEY=sk_live_xxx
```

Deploy:

```bash
supabase functions deploy paystack-initialize --no-verify-jwt
supabase functions deploy paystack-webhook --no-verify-jwt
```

Use the webhook URL in the Paystack dashboard:

`https://YOUR_PROJECT_ID.supabase.co/functions/v1/paystack-webhook`

The public website must call `paystack-initialize` rather than putting the Paystack secret key in the browser.

## 6. Linking the public website

The admin app and public website use the same Supabase project.

The next integration step is to replace the public site's static `src/data/events.ts`, `sermons.ts`, and `gallery.ts` reads with Supabase queries against:

- `public.events`
- `public.sermons`
- `public.gallery_items`

The public site should only read rows where `published = true`.

Keep the existing visual components; only replace their data source.

## Important

The repository originally describes its form tables as a no-auth public site and grants anonymous CRUD on those tables. That is not appropriate once an admin CMS is introduced. Before production, replace those policies so public users can INSERT but only administrators can SELECT/UPDATE/DELETE private submissions.
