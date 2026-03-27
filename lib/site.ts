export const siteConfig = {
  name: "CrispStack",
  description: "The anti-vibe-coded Next.js starter. Production-grade, visually polished, zero bloat.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ogImage: "/og.png",
  links: {
    github: "https://github.com/AmerSarhan/CrispStack",
  },
} as const
