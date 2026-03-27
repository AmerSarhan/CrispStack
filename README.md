<div align="center">

<img src="public/icon.png" alt="CrispStack" width="80" height="80" />

# crispstack

**The anti-vibe-coded Next.js starter.**
Production-grade, visually polished, zero bloat.

[![Next.js 16](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8?logo=tailwindcss)](https://tailwindcss.com)
[![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-latest-black)](https://ui.shadcn.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](./LICENSE)

[Demo](https://crispstack.vercel.app) · [Features](#features) · [Quick Start](#quick-start) · [Deploy](#deploy)

</div>

---

## Why CrispStack?

Most starters ship 20 integrations with default styling. CrispStack ships fewer features but **every pixel is intentional**.

- **Two distinct themes** — not just a dark mode toggle
- **Bulletproof SEO** — metadata factory, JSON-LD, sitemap, robots.txt
- **Auth-ready** — Clerk pre-configured with protected routes
- **Dashboard shell** — professional sidebar layout with responsive navigation
- **Smooth animations** — staggered reveals, hover effects, micro-interactions
- **Zero bloat** — no database, no payments, no email. Add what you need.

## Features

| Feature | Details |
|---------|---------|
| **Dual Themes** | Light "Corporate" (warm whites, mint green accent) + Dark "Premium" (deep zinc, mint green accent) |
| **SEO Engine** | Metadata factory, JSON-LD, dynamic sitemap, robots.txt, Open Graph images |
| **Authentication** | Clerk with sign-in, sign-up, and protected dashboard routes |
| **Dashboard Shell** | Sidebar navigation, header with user menu, responsive layout |
| **Landing Page** | Hero, features grid, pricing table, testimonials, footer |
| **Animations** | CSS-only staggered reveals, hover-lift cards, smooth transitions |
| **Stack** | Next.js 16, TypeScript, Tailwind CSS v4, shadcn/ui, Inter font |

## Quick Start

```bash
# Clone the repo
git clone https://github.com/AmerSarhan/CrispStack.git
cd CrispStack

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

> **Note:** CrispStack works out of the box with Clerk's keyless mode. For production, add your Clerk keys to `.env.local`.

## Project Structure

```
├── app/
│   ├── (marketing)/        # Landing page (public)
│   ├── (auth)/             # Sign-in / sign-up
│   ├── (dashboard)/        # Protected dashboard
│   ├── layout.tsx          # Root layout
│   ├── sitemap.ts          # Dynamic sitemap
│   └── robots.ts           # Dynamic robots.txt
├── components/
│   ├── ui/                 # shadcn/ui primitives
│   ├── landing/            # Landing page sections
│   ├── dashboard/          # Dashboard chrome
│   ├── shared/             # Navbar, footer, theme toggle
│   └── seo/                # JSON-LD component
├── lib/
│   ├── site.ts             # Site configuration
│   ├── seo.ts              # Metadata factory
│   └── utils.ts            # Utilities
└── proxy.ts                # Auth middleware
```

## Customization

### Change Colors

Edit the CSS custom properties in `app/globals.css`. Light theme is in `:root`, dark theme is in `.dark`. The mint green accent (`--primary`) ties both themes together.

### Change Site Info

Edit `lib/site.ts` — name, description, URL, and social links.

### Add Dashboard Pages

Create a new file in `app/(dashboard)/dashboard/your-page/page.tsx` and add a nav item in `components/dashboard/sidebar.tsx`.

### Swap Auth Provider

Replace `@clerk/nextjs` with your preferred auth library. Update `proxy.ts` and the `(auth)` route group.

## SEO Checklist

CrispStack handles these automatically:

- [x] Meta title with template (`Page | CrispStack`)
- [x] Meta description on every page
- [x] Open Graph tags (title, description, image)
- [x] Twitter Card tags
- [x] Canonical URLs via `metadataBase`
- [x] JSON-LD structured data (WebSite schema)
- [x] Dynamic `sitemap.xml`
- [x] Dynamic `robots.txt` (blocks `/dashboard/`)
- [x] Inter font via `next/font` (no layout shift)

## Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FAmerSarhan%2FCrispStack&env=NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,CLERK_SECRET_KEY&envDescription=Clerk%20API%20keys%20from%20dashboard.clerk.com)

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

[MIT](./LICENSE)
