import { UserButton } from "@clerk/nextjs"
import { ThemeToggle } from "@/components/shared/theme-toggle"
import { MobileSidebar } from "./sidebar"

interface DashboardHeaderProps {
  title: string
}

export function DashboardHeader({ title }: DashboardHeaderProps) {
  return (
    <header className="animate-fade-in flex h-16 items-center gap-4 border-b border-border/40 px-4 sm:px-6">
      <MobileSidebar />
      <h1 className="text-lg font-semibold">{title}</h1>
      <div className="ml-auto flex items-center gap-2">
        <ThemeToggle />
        <UserButton />
      </div>
    </header>
  )
}
