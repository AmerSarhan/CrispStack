import Link from "next/link"

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <img src="/icon.png" alt="CrispStack" className="h-8 w-8 rounded-lg" />
      <span className="text-lg font-semibold tracking-tight">crispstack</span>
    </Link>
  )
}
