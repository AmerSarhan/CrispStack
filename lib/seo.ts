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
