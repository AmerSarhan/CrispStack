"use client"

import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="animate-fade-up text-center">
        <h1 className="text-7xl font-bold text-primary">404</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link href="/" className={buttonVariants({ className: "mt-8" })}>
          Go Home
        </Link>
      </div>
    </div>
  )
}
