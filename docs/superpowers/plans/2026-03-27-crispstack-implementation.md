# CrispStack Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a production-grade Next.js 16 starter kit with two polished themes, landing page, auth, dashboard shell, and SEO engine.

**Architecture:** Next.js 16 App Router with route groups for marketing/auth/dashboard separation. shadcn/ui for components, Clerk for auth, next-themes for dual theming, custom SEO helpers.

**Tech Stack:** Next.js 16, TypeScript, Tailwind CSS v4, shadcn/ui, Clerk, next-themes, Inter font

**Branding:** Mint green accent (#7BFFA0), Inter font, lowercase "crispstack" wordmark, bracket-square icon logo. Logo files at `D:\crispstack\icon.png` and `D:\crispstack\crispstack.png`.

**Spec:** `docs/superpowers/specs/2026-03-27-crispstack-design.md`

---

## File Map

```
crispstack/
├── app/
│   ├── layout.tsx                          # Root layout: fonts, ClerkProvider, ThemeProvider, metadata
│   ├── not-found.tsx                       # Custom 404 page
│   ├── sitemap.ts                          # Dynamic sitemap
│   ├── robots.ts                           # Dynamic robots.txt
│   ├── (marketing)/
│   │   ├── layout.tsx                      # Marketing layout: navbar + footer
│   │   └── page.tsx                        # Landing page: all sections
│   ├── (auth)/
│   │   ├── layout.tsx                      # Auth layout: centered card
│   │   ├── sign-in/[[...sign-in]]/page.tsx # Clerk SignIn
│   │   └── sign-up/[[...sign-up]]/page.tsx # Clerk SignUp
│   └── (dashboard)/
│       ├── layout.tsx                      # Dashboard shell: sidebar + header
│       ├── page.tsx                        # Overview page
│       ├── analytics/page.tsx              # Analytics placeholder
│       └── settings/page.tsx               # Settings placeholder
├── components/
│   ├── ui/                                 # shadcn/ui primitives (added via CLI)
│   ├── theme-provider.tsx                  # next-themes wrapper
│   ├── landing/
│   │   ├── hero.tsx                        # Hero section
│   │   ├── features.tsx                    # Features grid
│   │   ├── pricing.tsx                     # Pricing table
│   │   ├── testimonials.tsx                # Testimonials cards
│   │   └── footer.tsx                      # Site footer
│   ├── dashboard/
│   │   ├── sidebar.tsx                     # Dashboard sidebar nav
│   │   ├── header.tsx                      # Dashboard header
│   │   └── shell.tsx                       # Dashboard layout wrapper
│   ├── shared/
│   │   ├── navbar.tsx                      # Marketing navbar
│   │   ├── theme-toggle.tsx                # Light/dark toggle button
│   │   └── logo.tsx                        # CrispStack logo component
│   └── seo/
│       └── json-ld.tsx                     # JSON-LD structured data
├── lib/
│   ├── site.ts                             # Site config constants
│   ├── seo.ts                              # createMetadata() helper
│   └── utils.ts                            # cn() utility
├── proxy.ts                                # Clerk middleware
├── public/
│   ├── og.png                              # Default OG image (placeholder)
│   └── favicon.ico                         # Favicon
├── .env.example                            # Documented env vars
├── .gitignore
├── LICENSE                                 # MIT
├── next.config.ts
└── README.md
```

---

### Task 1: Project Scaffold

**Files:**
- Create: entire project via `create-next-app`
- Create: `.env.example`
- Create: `LICENSE`
- Modify: `.gitignore`

- [ ] **Step 1: Create Next.js 16 project**

Run from the parent directory (`D:/Apps/osource`):

```bash
npx create-next-app@latest . --yes --ts --tailwind --eslint --app --src-dir=false --import-alias="@/*"
```

This creates the project in the current directory with TypeScript, Tailwind CSS, ESLint, App Router, and `@/*` import alias.

- [ ] **Step 2: Verify it runs**

```bash
npm run dev
```

Expected: Dev server starts on `http://localhost:3000`, default Next.js page renders.

Stop the dev server with Ctrl+C.

- [ ] **Step 3: Create `.env.example`**

```bash
# .env.example
```

```env
# Clerk Authentication
# Get your keys at https://dashboard.clerk.com
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# Clerk Routes
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Site URL (used for SEO metadata, sitemaps, OG images)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

- [ ] **Step 4: Create MIT LICENSE**

```
MIT License

Copyright (c) 2026 CrispStack

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

- [ ] **Step 5: Update `.gitignore` — add `.env*.local`**

Ensure `.gitignore` includes:

```
.env*.local
```

(create-next-app likely already includes this, but verify.)

- [ ] **Step 6: Commit**

```bash
git add .
git commit -m "feat: scaffold Next.js 16 project with TypeScript and Tailwind"
```

---

### Task 2: shadcn/ui + Theming Foundation

**Files:**
- Modify: `app/globals.css` (theme tokens)
- Create: `components/theme-provider.tsx`
- Modify: `app/layout.tsx` (add ThemeProvider)
- Create: `lib/utils.ts` (cn utility)
- Install: `next-themes`, shadcn/ui

- [ ] **Step 1: Initialize shadcn/ui**

```bash
npx shadcn@latest init
```

Accept defaults. This creates `components/ui/` and configures `components.json`.

- [ ] **Step 2: Install next-themes**

```bash
npm add next-themes
```

- [ ] **Step 3: Add commonly needed shadcn components**

```bash
npx shadcn@latest add button card badge separator sheet avatar dropdown-menu tooltip
```

- [ ] **Step 4: Create `lib/utils.ts`**

shadcn init may already create this. Verify it contains:

```ts
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

- [ ] **Step 5: Write dual theme tokens in `app/globals.css`**

Replace the contents of `app/globals.css` with the full theme system. The light theme ("Corporate") uses warm whites with indigo accent. The dark theme ("Premium") uses deep zinc with violet accent.

```css
@import "tailwindcss";
@plugin "tw-animate-css";

@custom-variant dark (&:is(.dark *));

:root {
  /* Corporate Light Theme */
  --background: oklch(0.985 0.002 75);      /* warm white */
  --foreground: oklch(0.145 0.014 75);       /* near-black stone */
  --card: oklch(1 0 0);                       /* white */
  --card-foreground: oklch(0.145 0.014 75);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.145 0.014 75);
  --primary: oklch(0.457 0.24 277);          /* indigo-600 */
  --primary-foreground: oklch(0.985 0.002 75);
  --secondary: oklch(0.96 0.005 75);         /* stone-100 */
  --secondary-foreground: oklch(0.215 0.014 75);
  --muted: oklch(0.96 0.005 75);
  --muted-foreground: oklch(0.553 0.013 75);
  --accent: oklch(0.96 0.005 75);
  --accent-foreground: oklch(0.215 0.014 75);
  --destructive: oklch(0.577 0.245 27.325);
  --destructive-foreground: oklch(0.985 0.002 75);
  --border: oklch(0.87 0.008 75);            /* stone-200 */
  --input: oklch(0.87 0.008 75);
  --ring: oklch(0.457 0.24 277);             /* indigo-600 */
  --radius: 0.625rem;

  --chart-1: oklch(0.457 0.24 277);
  --chart-2: oklch(0.6 0.2 150);
  --chart-3: oklch(0.55 0.15 250);
  --chart-4: oklch(0.65 0.2 50);
  --chart-5: oklch(0.5 0.2 330);

  --sidebar-background: oklch(0.985 0.002 75);
  --sidebar-foreground: oklch(0.145 0.014 75);
  --sidebar-primary: oklch(0.457 0.24 277);
  --sidebar-primary-foreground: oklch(0.985 0.002 75);
  --sidebar-accent: oklch(0.96 0.005 75);
  --sidebar-accent-foreground: oklch(0.215 0.014 75);
  --sidebar-border: oklch(0.87 0.008 75);
  --sidebar-ring: oklch(0.457 0.24 277);
}

.dark {
  /* Premium Dark Theme */
  --background: oklch(0.089 0.005 286);      /* zinc-950 */
  --foreground: oklch(0.985 0.002 286);      /* zinc-50 */
  --card: oklch(0.141 0.005 286);            /* zinc-900 */
  --card-foreground: oklch(0.985 0.002 286);
  --popover: oklch(0.141 0.005 286);
  --popover-foreground: oklch(0.985 0.002 286);
  --primary: oklch(0.72 0.17 292);           /* violet-400 */
  --primary-foreground: oklch(0.089 0.005 286);
  --secondary: oklch(0.215 0.006 286);       /* zinc-800 */
  --secondary-foreground: oklch(0.985 0.002 286);
  --muted: oklch(0.215 0.006 286);
  --muted-foreground: oklch(0.553 0.006 286);
  --accent: oklch(0.215 0.006 286);
  --accent-foreground: oklch(0.985 0.002 286);
  --destructive: oklch(0.577 0.245 27.325);
  --destructive-foreground: oklch(0.985 0.002 286);
  --border: oklch(0.274 0.006 286);          /* zinc-800 */
  --input: oklch(0.274 0.006 286);
  --ring: oklch(0.72 0.17 292);              /* violet-400 */

  --chart-1: oklch(0.72 0.17 292);
  --chart-2: oklch(0.6 0.2 180);
  --chart-3: oklch(0.55 0.15 60);
  --chart-4: oklch(0.65 0.18 330);
  --chart-5: oklch(0.5 0.2 120);

  --sidebar-background: oklch(0.089 0.005 286);
  --sidebar-foreground: oklch(0.985 0.002 286);
  --sidebar-primary: oklch(0.72 0.17 292);
  --sidebar-primary-foreground: oklch(0.089 0.005 286);
  --sidebar-accent: oklch(0.215 0.006 286);
  --sidebar-accent-foreground: oklch(0.985 0.002 286);
  --sidebar-border: oklch(0.274 0.006 286);
  --sidebar-ring: oklch(0.72 0.17 292);
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --color-sidebar-background: var(--sidebar-background);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
    font-feature-settings: "rlig" 1, "calt" 1;
  }
}
```

- [ ] **Step 6: Create `components/theme-provider.tsx`**

```tsx
"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
```

- [ ] **Step 7: Update `app/layout.tsx` with fonts + ThemeProvider**

```tsx
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

export const metadata: Metadata = {
  title: "CrispStack",
  description: "The anti-vibe-coded Next.js starter.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${GeistSans.variable} ${GeistMono.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
```

- [ ] **Step 8: Install Geist font package**

```bash
npm add geist
```

- [ ] **Step 9: Verify themes work**

```bash
npm run dev
```

Open `http://localhost:3000`. The page should render with the light theme. Open browser DevTools, add `class="dark"` to the `<html>` element — colors should switch to the dark theme.

- [ ] **Step 10: Commit**

```bash
git add .
git commit -m "feat: add shadcn/ui, dual theme system, and Geist fonts"
```

---

### Task 3: Site Config + SEO Engine

**Files:**
- Create: `lib/site.ts`
- Create: `lib/seo.ts`
- Create: `components/seo/json-ld.tsx`
- Create: `app/sitemap.ts`
- Create: `app/robots.ts`
- Modify: `app/layout.tsx` (use createMetadata)

- [ ] **Step 1: Create `lib/site.ts`**

```ts
export const siteConfig = {
  name: "CrispStack",
  description: "The anti-vibe-coded Next.js starter. Production-grade, visually polished, zero bloat.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ogImage: "/og.png",
  links: {
    github: "https://github.com/AmerSarhan/CrispStack",
  },
} as const
```

- [ ] **Step 2: Create `lib/seo.ts`**

```ts
import type { Metadata } from "next"
import { siteConfig } from "./site"

interface CreateMetadataOptions {
  title?: string
  description?: string
  image?: string
  noIndex?: boolean
}

export function createMetadata({
  title,
  description = siteConfig.description,
  image = siteConfig.ogImage,
  noIndex = false,
}: CreateMetadataOptions = {}): Metadata {
  const metaTitle = title
    ? `${title} | ${siteConfig.name}`
    : siteConfig.name

  return {
    title: metaTitle,
    description,
    openGraph: {
      title: metaTitle,
      description,
      url: siteConfig.url,
      siteName: siteConfig.name,
      images: [
        {
          url: `${siteConfig.url}${image}`,
          width: 1200,
          height: 630,
          alt: siteConfig.name,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description,
      images: [`${siteConfig.url}${image}`],
    },
    metadataBase: new URL(siteConfig.url),
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  }
}
```

- [ ] **Step 3: Create `components/seo/json-ld.tsx`**

```tsx
import { siteConfig } from "@/lib/site"

interface JsonLdProps {
  type?: "WebSite" | "Organization" | "WebPage"
  name?: string
  description?: string
  url?: string
}

export function JsonLd({
  type = "WebSite",
  name = siteConfig.name,
  description = siteConfig.description,
  url = siteConfig.url,
}: JsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": type,
    name,
    description,
    url,
    ...(type === "Organization" && {
      logo: `${siteConfig.url}/favicon.ico`,
      sameAs: [siteConfig.links.github],
    }),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
```

- [ ] **Step 4: Create `app/sitemap.ts`**

```ts
import type { MetadataRoute } from "next"
import { siteConfig } from "@/lib/site"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteConfig.url}/sign-in`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${siteConfig.url}/sign-up`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ]
}
```

- [ ] **Step 5: Create `app/robots.ts`**

```ts
import type { MetadataRoute } from "next"
import { siteConfig } from "@/lib/site"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/dashboard/"],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  }
}
```

- [ ] **Step 6: Update `app/layout.tsx` to use createMetadata + JsonLd**

Update the metadata export and add JsonLd to the body:

```tsx
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { ThemeProvider } from "@/components/theme-provider"
import { JsonLd } from "@/components/seo/json-ld"
import { createMetadata } from "@/lib/seo"
import "./globals.css"

export const metadata: Metadata = createMetadata()

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${GeistSans.variable} ${GeistMono.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <JsonLd />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
```

- [ ] **Step 7: Verify SEO output**

```bash
npm run dev
```

Check:
- `http://localhost:3000/sitemap.xml` returns XML sitemap
- `http://localhost:3000/robots.txt` returns robots rules
- View page source at `http://localhost:3000` — JSON-LD script tag is present

- [ ] **Step 8: Commit**

```bash
git add .
git commit -m "feat: add SEO engine with metadata factory, JSON-LD, sitemap, and robots"
```

---

### Task 4: Shared Components (Logo, Navbar, Theme Toggle, Footer)

**Files:**
- Create: `components/shared/logo.tsx`
- Create: `components/shared/theme-toggle.tsx`
- Create: `components/shared/navbar.tsx`
- Create: `components/landing/footer.tsx`
- Create: `app/(marketing)/layout.tsx`

- [ ] **Step 1: Create `components/shared/logo.tsx`**

```tsx
import Link from "next/link"

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
        <span className="text-sm font-bold text-primary-foreground">CS</span>
      </div>
      <span className="text-lg font-semibold tracking-tight">CrispStack</span>
    </Link>
  )
}
```

- [ ] **Step 2: Create `components/shared/theme-toggle.tsx`**

```tsx
"use client"

import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

function SunIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" /><path d="M12 20v2" /><path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" /><path d="M2 12h2" /><path d="M20 12h2" /><path d="m6.34 17.66-1.41 1.41" /><path d="m19.07 4.93-1.41 1.41" />
    </svg>
  )
}

function MoonIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  )
}

export function ThemeToggle() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9">
          <SunIcon className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <MoonIcon className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
```

- [ ] **Step 3: Create `components/shared/navbar.tsx`**

```tsx
"use client"

import Link from "next/link"
import { useState } from "react"
import { Logo } from "./logo"
import { ThemeToggle } from "./theme-toggle"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

function MenuIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  )
}

const navLinks = [
  { href: "#features", label: "Features" },
  { href: "#pricing", label: "Pricing" },
  { href: "#testimonials", label: "Testimonials" },
]

export function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Logo />

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link href="/sign-in">Get Started</Link>
          </Button>

          {/* Mobile menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <MenuIcon />
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <nav className="flex flex-col gap-4 pt-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-lg font-medium"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <Button asChild className="mt-4">
                  <Link href="/sign-in" onClick={() => setOpen(false)}>Get Started</Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
```

- [ ] **Step 4: Create `components/landing/footer.tsx`**

```tsx
import Link from "next/link"
import { Logo } from "@/components/shared/logo"
import { siteConfig } from "@/lib/site"

const footerLinks = {
  product: [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "Testimonials", href: "#testimonials" },
  ],
  resources: [
    { label: "Documentation", href: "#" },
    { label: "GitHub", href: siteConfig.links.github },
    { label: "Changelog", href: "#" },
  ],
  legal: [
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-border/40">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Logo />
            <p className="mt-4 text-sm text-muted-foreground">
              {siteConfig.description}
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold">Product</h3>
            <ul className="mt-3 space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold">Resources</h3>
            <ul className="mt-3 space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold">Legal</h3>
            <ul className="mt-3 space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-border/40 pt-6">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 5: Create `app/(marketing)/layout.tsx`**

```tsx
import { Navbar } from "@/components/shared/navbar"
import { Footer } from "@/components/landing/footer"

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
```

- [ ] **Step 6: Create a minimal `app/(marketing)/page.tsx` to test**

```tsx
export default function HomePage() {
  return (
    <div className="flex items-center justify-center py-24">
      <h1 className="text-4xl font-bold">CrispStack</h1>
    </div>
  )
}
```

- [ ] **Step 7: Verify**

```bash
npm run dev
```

Check `http://localhost:3000`:
- Navbar renders with logo, links, theme toggle
- Footer renders with links and copyright
- Theme toggle switches between light and dark
- Mobile menu works (resize browser to < 768px)

- [ ] **Step 8: Commit**

```bash
git add .
git commit -m "feat: add navbar, footer, theme toggle, and marketing layout"
```

---

### Task 5: Landing Page Sections

**Files:**
- Create: `components/landing/hero.tsx`
- Create: `components/landing/features.tsx`
- Create: `components/landing/pricing.tsx`
- Create: `components/landing/testimonials.tsx`
- Modify: `app/(marketing)/page.tsx`

- [ ] **Step 1: Create `components/landing/hero.tsx`**

```tsx
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/lib/site"

function GitHubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  )
}

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Subtle grid background */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-background to-transparent" />

      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32 lg:py-40">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-6 inline-flex items-center rounded-full border border-border/60 bg-muted/50 px-4 py-1.5 text-sm text-muted-foreground">
            The anti-vibe-coded starter
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Ship beautiful apps,{" "}
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              not ugly prototypes
            </span>
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            A Next.js starter that prioritizes design quality over feature count.
            Two polished themes, bulletproof SEO, and production-grade defaults
            so you can focus on what makes your app unique.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/sign-up">Get Started</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href={siteConfig.links.github} target="_blank" rel="noopener noreferrer">
                <GitHubIcon className="mr-2" />
                View on GitHub
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Create `components/landing/features.tsx`**

```tsx
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

function PaletteIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>
  )
}

function SearchIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
  )
}

function ShieldIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/></svg>
  )
}

function LayoutIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>
  )
}

function ZapIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/></svg>
  )
}

function CodeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
  )
}

const features = [
  {
    icon: PaletteIcon,
    title: "Two Polished Themes",
    description: "Light corporate and dark premium themes — not just a dark mode toggle. Each theme is a complete design system.",
  },
  {
    icon: SearchIcon,
    title: "Bulletproof SEO",
    description: "Metadata factory, JSON-LD, dynamic sitemap, robots.txt, Open Graph images. Lighthouse SEO score of 100.",
  },
  {
    icon: ShieldIcon,
    title: "Auth Ready",
    description: "Clerk authentication pre-configured with sign-in, sign-up, and protected routes. Swap for any provider.",
  },
  {
    icon: LayoutIcon,
    title: "Dashboard Shell",
    description: "Professional sidebar layout with header, breadcrumbs, and responsive navigation. Ready for your content.",
  },
  {
    icon: ZapIcon,
    title: "Zero Bloat",
    description: "No database, no payments, no email — just the foundation you need. Add what matters for your project.",
  },
  {
    icon: CodeIcon,
    title: "Production Defaults",
    description: "Next.js 16, TypeScript, Tailwind CSS, shadcn/ui. Every dependency is intentional, every default is production-grade.",
  },
]

export function Features() {
  return (
    <section id="features" className="py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Everything you need, nothing you don&apos;t
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Intentionally minimal. Every feature earns its place.
          </p>
        </div>
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title} className="border-border/50 bg-card/50 transition-colors hover:bg-card">
              <CardHeader>
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <feature.icon className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
                <CardDescription className="text-sm leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Create `components/landing/pricing.tsx`**

```tsx
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M20 6 9 17l-5-5"/></svg>
  )
}

const plans = [
  {
    name: "Starter",
    price: "$0",
    period: "forever",
    description: "Perfect for side projects and learning.",
    features: ["Up to 3 projects", "Basic analytics", "Community support", "1GB storage"],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$29",
    period: "/month",
    description: "For professionals who need more power.",
    features: ["Unlimited projects", "Advanced analytics", "Priority support", "100GB storage", "Custom domains", "Team collaboration"],
    cta: "Start Free Trial",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For organizations with specific needs.",
    features: ["Everything in Pro", "Dedicated support", "SLA guarantee", "Unlimited storage", "SSO & SAML", "Custom integrations", "Audit logs"],
    cta: "Contact Sales",
    highlighted: false,
  },
]

export function Pricing() {
  return (
    <section id="pricing" className="py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Simple, transparent pricing
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Choose the plan that fits your needs. Upgrade or downgrade at any time.
          </p>
        </div>
        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={cn(
                "relative flex flex-col border-border/50",
                plan.highlighted && "border-primary shadow-lg shadow-primary/10"
              )}
            >
              {plan.highlighted && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
                  Most Popular
                </Badge>
              )}
              <CardHeader>
                <CardTitle className="text-lg">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col">
                <ul className="flex-1 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm">
                      <CheckIcon className="h-4 w-4 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  className="mt-8 w-full"
                  variant={plan.highlighted ? "default" : "outline"}
                >
                  {plan.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Create `components/landing/testimonials.tsx`**

```tsx
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const testimonials = [
  {
    quote: "Finally, a starter that doesn't look like every other AI-generated template. The attention to design detail saved us weeks of polish work.",
    name: "Sarah Chen",
    role: "CTO at TechFlow",
    initials: "SC",
  },
  {
    quote: "We evaluated 20+ starters before choosing CrispStack. The dual theme system and SEO setup are exactly what we needed for our client projects.",
    name: "Marcus Rodriguez",
    role: "Lead Developer at PixelForge",
    initials: "MR",
  },
  {
    quote: "Clean code, no bloat, beautiful defaults. This is what a starter kit should be — a foundation, not a framework.",
    name: "Emily Park",
    role: "Indie Maker",
    initials: "EP",
  },
]

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Loved by developers
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            See what others are saying about CrispStack.
          </p>
        </div>
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.name} className="border-border/50 bg-card/50">
              <CardContent className="pt-6">
                <blockquote className="text-sm leading-relaxed text-muted-foreground">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <div className="mt-6 flex items-center gap-3">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="bg-primary/10 text-xs font-medium text-primary">
                      {testimonial.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 5: Update `app/(marketing)/page.tsx` to compose all sections**

```tsx
import { Hero } from "@/components/landing/hero"
import { Features } from "@/components/landing/features"
import { Pricing } from "@/components/landing/pricing"
import { Testimonials } from "@/components/landing/testimonials"

export default function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <Pricing />
      <Testimonials />
    </>
  )
}
```

- [ ] **Step 6: Verify**

```bash
npm run dev
```

Check `http://localhost:3000`:
- All 4 sections render (hero, features, pricing, testimonials)
- Anchor links in navbar scroll to correct sections
- Both themes look correct
- Responsive at mobile widths

- [ ] **Step 7: Commit**

```bash
git add .
git commit -m "feat: add landing page with hero, features, pricing, and testimonials"
```

---

### Task 6: Auth (Clerk Integration)

**Files:**
- Create: `proxy.ts`
- Create: `app/(auth)/layout.tsx`
- Create: `app/(auth)/sign-in/[[...sign-in]]/page.tsx`
- Create: `app/(auth)/sign-up/[[...sign-up]]/page.tsx`
- Modify: `app/layout.tsx` (wrap with ClerkProvider)

- [ ] **Step 1: Install Clerk**

```bash
npm install @clerk/nextjs
```

- [ ] **Step 2: Create `proxy.ts`**

Place at project root (same level as `app/`):

```ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"

const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api(.*)",
])

export default clerkMiddleware(async (auth, request) => {
  if (!isPublicRoute(request)) {
    await auth.protect()
  }
})

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
}
```

- [ ] **Step 3: Update `app/layout.tsx` to wrap with ClerkProvider**

```tsx
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { ClerkProvider } from "@clerk/nextjs"
import { ThemeProvider } from "@/components/theme-provider"
import { JsonLd } from "@/components/seo/json-ld"
import { createMetadata } from "@/lib/seo"
import "./globals.css"

export const metadata: Metadata = createMetadata()

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${GeistSans.variable} ${GeistMono.variable} font-sans antialiased`}>
        <ClerkProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <JsonLd />
            {children}
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  )
}
```

- [ ] **Step 4: Create `app/(auth)/layout.tsx`**

```tsx
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      {children}
    </div>
  )
}
```

- [ ] **Step 5: Create `app/(auth)/sign-in/[[...sign-in]]/page.tsx`**

```tsx
import { SignIn } from "@clerk/nextjs"
import { createMetadata } from "@/lib/seo"

export const metadata = createMetadata({ title: "Sign In" })

export default function SignInPage() {
  return <SignIn />
}
```

- [ ] **Step 6: Create `app/(auth)/sign-up/[[...sign-up]]/page.tsx`**

```tsx
import { SignUp } from "@clerk/nextjs"
import { createMetadata } from "@/lib/seo"

export const metadata = createMetadata({ title: "Sign Up" })

export default function SignUpPage() {
  return <SignUp />
}
```

- [ ] **Step 7: Verify**

The app will work without Clerk keys using keyless mode. Run:

```bash
npm run dev
```

Check:
- `http://localhost:3000/sign-in` renders Clerk sign-in form
- `http://localhost:3000/sign-up` renders Clerk sign-up form
- `http://localhost:3000/` (landing page) still works without auth
- Navigating to `/dashboard` (once created) should redirect to sign-in

- [ ] **Step 8: Commit**

```bash
git add .
git commit -m "feat: add Clerk auth with proxy, sign-in, and sign-up pages"
```

---

### Task 7: Dashboard Shell

**Files:**
- Create: `components/dashboard/sidebar.tsx`
- Create: `components/dashboard/header.tsx`
- Create: `components/dashboard/shell.tsx`
- Create: `app/(dashboard)/layout.tsx`
- Create: `app/(dashboard)/page.tsx`
- Create: `app/(dashboard)/analytics/page.tsx`
- Create: `app/(dashboard)/settings/page.tsx`

- [ ] **Step 1: Create `components/dashboard/sidebar.tsx`**

```tsx
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Logo } from "@/components/shared/logo"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useState } from "react"

function HomeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
  )
}

function BarChartIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="12" x2="12" y1="20" y2="10"/><line x1="18" x2="18" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="16"/></svg>
  )
}

function SettingsIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
  )
}

function MenuIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
  )
}

const navItems = [
  { href: "/", label: "Overview", icon: HomeIcon },
  { href: "/analytics", label: "Analytics", icon: BarChartIcon },
  { href: "/settings", label: "Settings", icon: SettingsIcon },
]

function SidebarNav() {
  const pathname = usePathname()

  return (
    <nav className="flex flex-col gap-1 px-3">
      {navItems.map((item) => {
        const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              isActive
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            )}
          >
            <item.icon />
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}

export function Sidebar() {
  return (
    <aside className="hidden w-64 shrink-0 border-r border-border/40 lg:block">
      <div className="flex h-full flex-col">
        <div className="flex h-16 items-center px-6">
          <Logo />
        </div>
        <div className="flex-1 py-4">
          <SidebarNav />
        </div>
      </div>
    </aside>
  )
}

export function MobileSidebar() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <MenuIcon />
          <span className="sr-only">Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 p-0">
        <div className="flex h-16 items-center px-6">
          <Logo />
        </div>
        <div className="py-4" onClick={() => setOpen(false)}>
          <SidebarNav />
        </div>
      </SheetContent>
    </Sheet>
  )
}
```

- [ ] **Step 2: Create `components/dashboard/header.tsx`**

```tsx
import { UserButton } from "@clerk/nextjs"
import { ThemeToggle } from "@/components/shared/theme-toggle"
import { MobileSidebar } from "./sidebar"

interface DashboardHeaderProps {
  title: string
}

export function DashboardHeader({ title }: DashboardHeaderProps) {
  return (
    <header className="flex h-16 items-center gap-4 border-b border-border/40 px-4 sm:px-6">
      <MobileSidebar />
      <h1 className="text-lg font-semibold">{title}</h1>
      <div className="ml-auto flex items-center gap-2">
        <ThemeToggle />
        <UserButton afterSignOutUrl="/" />
      </div>
    </header>
  )
}
```

- [ ] **Step 3: Create `components/dashboard/shell.tsx`**

```tsx
import { Sidebar } from "./sidebar"

export function DashboardShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex flex-1 flex-col">{children}</div>
    </div>
  )
}
```

- [ ] **Step 4: Create `app/(dashboard)/layout.tsx`**

```tsx
import { DashboardShell } from "@/components/dashboard/shell"
import { createMetadata } from "@/lib/seo"

export const metadata = createMetadata({ title: "Dashboard", noIndex: true })

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <DashboardShell>{children}</DashboardShell>
}
```

- [ ] **Step 5: Create `app/(dashboard)/page.tsx` (Overview)**

```tsx
import { DashboardHeader } from "@/components/dashboard/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const stats = [
  { title: "Total Users", value: "2,420", change: "+12.5%" },
  { title: "Active Sessions", value: "1,210", change: "+8.2%" },
  { title: "Revenue", value: "$45,231", change: "+20.1%" },
  { title: "Conversion Rate", value: "3.2%", change: "+1.2%" },
]

export default function DashboardPage() {
  return (
    <>
      <DashboardHeader title="Overview" />
      <div className="flex-1 space-y-6 p-4 sm:p-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.title} className="border-border/50">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-emerald-500">{stat.change}</span> from last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-lg">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex h-64 items-center justify-center rounded-lg border border-dashed border-border/60">
              <p className="text-sm text-muted-foreground">Chart placeholder — add your data visualization here</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
```

- [ ] **Step 6: Create `app/(dashboard)/analytics/page.tsx`**

```tsx
import { DashboardHeader } from "@/components/dashboard/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AnalyticsPage() {
  return (
    <>
      <DashboardHeader title="Analytics" />
      <div className="flex-1 space-y-6 p-4 sm:p-6">
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-lg">Traffic Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex h-48 items-center justify-center rounded-lg border border-dashed border-border/60">
                <p className="text-sm text-muted-foreground">Traffic chart placeholder</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-lg">User Engagement</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex h-48 items-center justify-center rounded-lg border border-dashed border-border/60">
                <p className="text-sm text-muted-foreground">Engagement chart placeholder</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
```

- [ ] **Step 7: Create `app/(dashboard)/settings/page.tsx`**

```tsx
import { DashboardHeader } from "@/components/dashboard/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export default function SettingsPage() {
  return (
    <>
      <DashboardHeader title="Settings" />
      <div className="flex-1 space-y-6 p-4 sm:p-6">
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>Manage your account settings and preferences.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">Display Name</label>
                <div className="rounded-md border border-input bg-background px-3 py-2 text-sm text-muted-foreground">
                  John Doe
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <div className="rounded-md border border-input bg-background px-3 py-2 text-sm text-muted-foreground">
                  john@example.com
                </div>
              </div>
            </div>
            <Separator />
            <div className="flex justify-end">
              <Button>Save Changes</Button>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50 border-destructive/50">
          <CardHeader>
            <CardTitle className="text-destructive">Danger Zone</CardTitle>
            <CardDescription>Irreversible actions for your account.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="destructive">Delete Account</Button>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
```

- [ ] **Step 8: Verify**

```bash
npm run dev
```

Check:
- `/` shows landing page (no sidebar)
- Navigate to `/sign-in`, sign in (or use keyless mode)
- After sign-in, navigate to `/` — this goes to dashboard overview (route group `(dashboard)`)
- Sidebar nav works: Overview, Analytics, Settings
- Active nav item highlights correctly
- Mobile sidebar drawer works on small screens
- User button appears in header

**Note:** The `/` route exists in both `(marketing)` and `(dashboard)`. Next.js will use the first match. We need to handle this — see Step 9.

- [ ] **Step 9: Fix route conflict — separate dashboard to `/dashboard`**

Update the dashboard routes to use a `/dashboard` prefix to avoid conflicting with the marketing `/`:

Rename `app/(dashboard)/page.tsx` route by restructuring:
- Move `app/(dashboard)/page.tsx` to `app/(dashboard)/dashboard/page.tsx`
- Move `app/(dashboard)/analytics/page.tsx` to `app/(dashboard)/dashboard/analytics/page.tsx`
- Move `app/(dashboard)/settings/page.tsx` to `app/(dashboard)/dashboard/settings/page.tsx`
- Move `app/(dashboard)/layout.tsx` to `app/(dashboard)/dashboard/layout.tsx`

Update sidebar nav items in `components/dashboard/sidebar.tsx`:

```ts
const navItems = [
  { href: "/dashboard", label: "Overview", icon: HomeIcon },
  { href: "/dashboard/analytics", label: "Analytics", icon: BarChartIcon },
  { href: "/dashboard/settings", label: "Settings", icon: SettingsIcon },
]
```

Update the `isActive` check:

```ts
const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href))
```

Update navbar "Get Started" links to point to `/dashboard`.

- [ ] **Step 10: Commit**

```bash
git add .
git commit -m "feat: add dashboard shell with sidebar, header, and placeholder pages"
```

---

### Task 8: Custom 404 Page

**Files:**
- Create: `app/not-found.tsx`

- [ ] **Step 1: Create `app/not-found.tsx`**

```tsx
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="mt-4 text-lg text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Button asChild className="mt-8">
        <Link href="/">Go Home</Link>
      </Button>
    </div>
  )
}
```

- [ ] **Step 2: Verify**

Navigate to `http://localhost:3000/nonexistent-page` — should show the 404 page.

- [ ] **Step 3: Commit**

```bash
git add .
git commit -m "feat: add custom 404 page"
```

---

### Task 9: README + Repo Polish

**Files:**
- Create: `README.md`
- Modify: `package.json` (name, description, repository)

- [ ] **Step 1: Write `README.md`**

```markdown
<div align="center">

# CrispStack

**The anti-vibe-coded Next.js starter.**
Production-grade, visually polished, zero bloat.

[![Next.js 16](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8?logo=tailwindcss)](https://tailwindcss.com)
[![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-latest-black)](https://ui.shadcn.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](./LICENSE)

[Demo](https://crispstack.vercel.app) · [Documentation](#features) · [Deploy](#deploy)

</div>

---

## Why CrispStack?

Most starters ship 20 integrations with default styling. CrispStack ships fewer features but **every pixel is intentional**.

- Two distinct themes — not just a dark mode toggle
- Bulletproof SEO — Lighthouse score of 100
- Auth-ready — Clerk pre-configured
- Dashboard shell — professional sidebar layout
- Zero bloat — no database, no payments, no email. Add what you need.

## Features

| Feature | Details |
|---------|---------|
| **Dual Themes** | Light "Corporate" (warm whites, indigo accent) + Dark "Premium" (deep zinc, violet accent) |
| **SEO Engine** | Metadata factory, JSON-LD, dynamic sitemap, robots.txt, Open Graph images |
| **Authentication** | Clerk with sign-in, sign-up, and protected dashboard routes |
| **Dashboard Shell** | Sidebar navigation, header with user menu, responsive layout |
| **Landing Page** | Hero, features grid, pricing table, testimonials, footer |
| **Stack** | Next.js 16, TypeScript, Tailwind CSS v4, shadcn/ui, Geist fonts |

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

Edit the CSS custom properties in `app/globals.css`. Light theme is in `:root`, dark theme is in `.dark`.

### Change Site Info

Edit `lib/site.ts` — name, description, URL, and social links.

### Add Pages

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
- [x] Geist fonts via `next/font` (no layout shift)

## Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FAmerSarhan%2FCrispStack&env=NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,CLERK_SECRET_KEY&envDescription=Clerk%20API%20keys%20from%20dashboard.clerk.com)

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

[MIT](./LICENSE)
```

- [ ] **Step 2: Update `package.json`**

Update the `name`, `description`, and add `repository` field:

```json
{
  "name": "crispstack",
  "description": "The anti-vibe-coded Next.js starter. Production-grade, visually polished, zero bloat.",
  "repository": {
    "type": "git",
    "url": "https://github.com/AmerSarhan/CrispStack.git"
  }
}
```

- [ ] **Step 3: Verify build**

```bash
npm run build
```

Expected: Build succeeds with no errors.

- [ ] **Step 4: Commit**

```bash
git add .
git commit -m "feat: add README with deploy button, docs, and repo metadata"
```

---

### Task 10: Final Push

- [ ] **Step 1: Push to GitHub**

```bash
git branch -M main
git push -u origin main
```

- [ ] **Step 2: Set GitHub repo topics**

```bash
gh repo edit AmerSarhan/CrispStack --description "The anti-vibe-coded Next.js starter. Production-grade, visually polished, zero bloat." --add-topic nextjs,nextjs-starter,nextjs-template,shadcn-ui,tailwindcss,typescript,clerk-auth,seo,saas-starter,dashboard,landing-page,dark-mode,react,starter-kit
```

- [ ] **Step 3: Verify on GitHub**

Visit https://github.com/AmerSarhan/CrispStack — README renders with badges, deploy button works.
