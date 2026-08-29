# The Neighbourhood Church (TNC)

> Where Faith Meets Family.

A premium, immersive 3D church website built with React, Vite, Tailwind CSS, React Three Fiber, Framer Motion, and Supabase.

## Features

- **Immersive 3D Hero Scene** — floating illuminated cross, Bible, light rays, clouds, birds, particles, and mouse parallax (React Three Fiber + Three.js)
- **Smooth Scrolling** — Lenis-powered buttery scroll experience
- **Beautiful Animations** — Framer Motion page transitions, reveal-on-scroll, animated counters, micro-interactions
- **Fully Responsive** — mobile-first design with a glassmorphic mobile menu
- **11 Pages** — Home, About, Pastors, Ministries (+ individual ministry pages), Sermons, Events, Gallery, Giving, Prayer, Contact
- **Working Forms** — Prayer requests, event registration, giving, contact, newsletter — all persisted to Supabase
- **Sermon Browser** — search, filter by category, featured sermon, video modal
- **Gallery** — filterable grid with lightbox
- **Events** — countdown timers, registration modal
- **Daily Verse** — rotates daily, plus weekly memory verse and announcements

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite, TypeScript |
| Styling | Tailwind CSS |
| 3D | Three.js, @react-three/fiber, @react-three/drei |
| Animation | Framer Motion, Lenis |
| Routing | React Router v6 |
| Carousel | SwiperJS |
| Icons | Lucide React |
| Backend | Supabase (PostgreSQL, RLS) |

## Getting Started

```bash
npm install
npm run dev
```

The dev server runs automatically. Supabase credentials are pre-configured.

## Build

```bash
npm run build
npm run typecheck
```

## Project Structure

```
src/
├── components/      # Reusable UI (Navbar, Footer, Reveal, PageHeader, 3D scene)
├── pages/           # Route-level pages
├── sections/        # Home page sections
├── layouts/         # Layout wrapper
├── hooks/           # Custom hooks (useInView, useCountUp, useSmoothScroll)
├── services/        # Supabase client
├── data/            # Church content data
└── index.css        # Global styles + Tailwind
```

## Database

All forms persist to Supabase tables with RLS enabled:

- `prayer_requests` — prayer submissions
- `newsletter_subscribers` — email subscriptions
- `event_registrations` — event sign-ups
- `volunteer_signups` — volunteer registrations
- `contact_messages` — contact form
- `giving_records` — giving pledges
- `plan_your_visit` — visit planning

## Design

- **Primary:** #1E40AF · **Secondary:** #38BDF8 · **Accent:** #F59E0B
- White backgrounds, glassmorphism, soft shadows, rounded corners
- Cormorant Garamond (display) + Inter (body)
- 8px spacing system, 6+ color ramps

---

© The Neighbourhood Church. Built with love.
