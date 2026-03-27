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
