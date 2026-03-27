# CrispStack — Design Spec

> The anti-vibe-coded Next.js starter. Production-grade, visually polished, zero bloat.

## 1. Vision

CrispStack is a Next.js 16 starter kit that prioritizes **design quality over feature count**. While competitors ship 20+ integrations with default styling, CrispStack ships fewer features but every pixel is intentional. Two distinct themes (light corporate, dark premium), bulletproof SEO, and a landing page beautiful enough to use as-is.

**Target users:** Indie hackers, freelancers, agencies, devs at companies — anyone who wants a clean starting point without the vibe-coded aesthetic.

**Differentiator:** Visual polish. The best-looking starter on GitHub, with the best README.

## 2. Tech Stack

| Layer | Choice | Why |
|-------|--------|-----|
| Framework | Next.js 16 (App Router) | Latest, Server Components default |
| UI | shadcn/ui + Tailwind CSS v4 | Industry standard, customizable |
| Fonts | Geist Sans + Geist Mono | Clean, professional, Vercel-native |
| Auth | Clerk (via Vercel Marketplace) | Best DX, pre-built components, free tier |
| Theming | CSS variables (oklch) + `next-themes` | Two distinct theme profiles |
| SEO | Custom metadata helpers + JSON-LD | Lighthouse 100 target |
| Deployment | Vercel (zero-config) | One-click deploy button in README |

**Explicitly excluded (for now):** Database, payments, email, blog/MDX, i18n, testing framework, monorepo, CMS. These can be added later as the project grows.

## 3. Project Structure

```
crispstack/
├── app/
│   ├── (marketing)/                # Public landing page
│   │   ├── layout.tsx              # Marketing layout (navbar + footer)
│   │   └── page.tsx                # Landing page (hero, features, pricing, testimonials)
│   ├── (auth)/                     # Auth pages
│   │   ├── sign-in/[[...sign-in]]/page.tsx
│   │   └── sign-up/[[...sign-up]]/page.tsx
│   ├── (dashboard)/                # Protected area
│   │   ├── layout.tsx              # Dashboard shell (sidebar + header)
│   │   ├── page.tsx                # Overview / home
│   │   ├── settings/page.tsx       # Settings placeholder
│   │   └── analytics/page.tsx      # Analytics placeholder
│   ├── layout.tsx                  # Root layout: fonts, theme provider, metadata
│   ├── not-found.tsx               # Custom 404
│   └── sitemap.ts                  # Dynamic sitemap generation
├── components/
│   ├── ui/                         # shadcn/ui primitives
│   ├── landing/                    # Landing page sections
│   │   ├── hero.tsx
│   │   ├── features.tsx
│   │   ├── pricing.tsx
│   │   ├── testimonials.tsx
│   │   └── footer.tsx
│   ├── dashboard/                  # Dashboard chrome
│   │   ├── sidebar.tsx
│   │   ├── header.tsx
│   │   └── shell.tsx
│   ├── shared/                     # Shared across layouts
│   │   ├── navbar.tsx
│   │   ├── theme-toggle.tsx
│   │   └── logo.tsx
│   └── seo/                        # SEO components
│       └── json-ld.tsx
├── lib/
│   ├── seo.ts                      # Metadata factory + defaults
│   ├── site.ts                     # Site config (name, description, URLs)
│   └── utils.ts                    # cn() utility
├── styles/
│   └── globals.css                 # Tailwind base + theme tokens
├── proxy.ts                        # Clerk auth middleware (Next.js 16)
├── public/
│   ├── og.png                      # Default Open Graph image
│   ├── favicon.ico
│   └── robots.ts                  # Dynamic robots.txt generation
├── next.config.ts
├── tailwind.config.ts
├── package.json
├── tsconfig.json
├── .env.example                    # Required env vars documented
├── .gitignore
├── LICENSE                         # MIT
└── README.md                       # The star-getter
```

## 4. Theming — Two Distinct Profiles

Not just "toggle dark mode." Two intentionally designed color systems.

### Light Theme: "Corporate"
- Background: warm white (#fafaf9 / stone-50 range)
- Text: near-black (#1c1917 / stone-900)
- Accent: slate blue (#4f46e5 / indigo-600)
- Cards: white with subtle stone borders
- Feel: clean, trustworthy, professional. Think Linear's marketing site.

### Dark Theme: "Premium"
- Background: deep neutral (#09090b / zinc-950)
- Text: soft white (#fafafa / zinc-50)
- Accent: soft violet (#a78bfa / violet-400)
- Cards: zinc-900 with subtle zinc-800 borders
- Feel: premium, modern, developer-friendly. Think Vercel's dashboard.

### Implementation
- CSS custom properties using oklch color space in `globals.css`
- `next-themes` for system preference detection + manual toggle
- Both themes defined as complete token sets — not just foreground/background swaps
- shadcn/ui components inherit tokens automatically

## 5. Landing Page Sections

All sections are Server Components. No client JS unless interaction is needed.

### 5.1 Navbar
- Logo (left), nav links (center), theme toggle + CTA button (right)
- Sticky on scroll with subtle backdrop blur
- Mobile: sheet/drawer navigation

### 5.2 Hero
- Large heading with gradient text accent
- Subheading (1-2 sentences)
- Two CTAs: "Get Started" (primary) + "View on GitHub" (secondary/outline)
- Optional: subtle grid/dot background pattern (CSS only, no JS)

### 5.3 Features
- 2x3 grid of feature cards (6 features)
- Each card: icon + title + description
- Clean card design with subtle hover state
- Features describe CrispStack itself (SEO, themes, auth, dashboard, etc.)

### 5.4 Pricing
- 3-column pricing table (Free / Pro / Enterprise)
- Placeholder data — users replace with their own
- Highlighted "recommended" tier
- Feature checklist per tier

### 5.5 Testimonials
- 3 testimonial cards with avatar, name, role, quote
- Placeholder data — users replace with their own

### 5.6 Footer
- Logo + description, link columns, social icons, copyright
- Clean, minimal

## 6. Dashboard Shell

A professional-looking dashboard structure with placeholder content. The point is the chrome (sidebar, header, layout), not the data.

### 6.1 Sidebar
- Logo at top
- Navigation links with icons (Overview, Analytics, Settings)
- User avatar + name at bottom (from Clerk)
- Collapsible on desktop, drawer on mobile

### 6.2 Header
- Page title (dynamic)
- Breadcrumbs
- Theme toggle + user menu (Clerk UserButton)

### 6.3 Pages
- **Overview:** Welcome message + placeholder stat cards (4-up grid) + placeholder chart area
- **Analytics:** Placeholder charts/tables
- **Settings:** Placeholder form with sections

All dashboard pages are protected by Clerk auth via `proxy.ts`.

## 7. Auth Flow

Using Clerk with Vercel Marketplace integration.

### Pages
- `/sign-in` — Clerk's `<SignIn />` component, styled to match theme
- `/sign-up` — Clerk's `<SignUp />` component, styled to match theme

### proxy.ts
- Runs `clerkMiddleware()` on all routes
- Public routes: `/`, `/sign-in(.*)`, `/sign-up(.*)`
- Everything under `(dashboard)` requires auth
- Redirects unauthenticated users to `/sign-in`

### Environment Variables
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
```

## 8. SEO Engine

Target: Lighthouse SEO score of 100.

### 8.1 Metadata Factory (`lib/seo.ts`)
- `createMetadata()` helper that merges page-specific metadata with site defaults
- Handles: title template, description, Open Graph, Twitter cards, canonical URLs
- Type-safe — returns `Metadata` from `next`

### 8.2 Site Config (`lib/site.ts`)
- Single source of truth for site name, description, URL, social links
- Used by metadata factory and JSON-LD

### 8.3 JSON-LD
- `<JsonLd />` component for structured data
- Pre-built schemas: WebSite, Organization, WebPage
- Extensible for users to add Product, Article, etc.

### 8.4 Static SEO Files
- `sitemap.ts` — dynamic sitemap generation from app routes
- `robots.ts` — dynamic robots.txt generation, allows all, points to sitemap
- `og.png` — default Open Graph image (1200x630) in `public/`

### 8.5 Performance
- Geist fonts via `next/font` (no layout shift)
- No client JS on landing page unless needed for interaction
- Images via `next/image` where applicable

## 9. README — The Star-Getter

The README is as important as the code. Structure:

1. **Hero banner** — designed image or SVG with CrispStack logo
2. **One-liner** — "The anti-vibe-coded Next.js starter. Production-grade, visually polished, zero bloat."
3. **Preview GIF/screenshot** — light and dark theme side by side
4. **Feature badges** — Next.js 16, shadcn/ui, Clerk, Tailwind, TypeScript, Lighthouse 100
5. **Deploy button** — "Deploy to Vercel" one-click button
6. **Features grid** — what's included, concise
7. **Quick start** — 4 steps: clone, install, env vars, dev
8. **Project structure** — tree view
9. **Customization guide** — how to change colors, add pages, swap auth
10. **SEO checklist** — what's handled automatically
11. **Contributing** — open to PRs
12. **License** — MIT

## 10. Repo SEO (GitHub Discoverability)

- **Description:** "The anti-vibe-coded Next.js starter. Production-grade, visually polished, zero bloat."
- **Topics/tags:** `nextjs`, `nextjs-starter`, `nextjs-template`, `shadcn-ui`, `tailwindcss`, `typescript`, `clerk-auth`, `seo`, `saas-starter`, `dashboard`, `landing-page`, `dark-mode`, `react`, `starter-kit`
- **Social preview image:** Custom OG image matching the README hero
- **License file:** MIT
- **One-click deploy button** in README (drives traffic back to repo)

## 11. What Ships in Week 1

| Day | Deliverable |
|-----|------------|
| 1 | Project scaffold, Next.js 16 + shadcn/ui + Geist + theme system |
| 2 | Landing page: hero, features, pricing, testimonials, footer |
| 3 | Dashboard shell: sidebar, header, overview/analytics/settings pages |
| 4 | Auth: Clerk integration, proxy.ts, sign-in/sign-up pages |
| 5 | SEO engine: metadata factory, JSON-LD, sitemap, robots, OG image |
| 6 | Polish: responsive, animations, both themes pixel-perfect |
| 7 | README, repo SEO, deploy button, demo deployment |

## 12. Out of Scope (Future)

These are intentionally excluded from v1 to keep quality high:

- Database / ORM
- Payments / Stripe
- Email templates
- Blog / MDX
- i18n
- Testing setup
- CLI scaffolder
- Monorepo structure
- CMS integration
