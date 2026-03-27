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
