import { DashboardHeader } from "@/components/dashboard/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AnalyticsPage() {
  return (
    <>
      <DashboardHeader title="Analytics" />
      <div className="flex-1 space-y-6 p-4 sm:p-6">
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="animate-fade-up delay-100 hover-lift border-border/50">
            <CardHeader>
              <CardTitle className="text-lg">Traffic Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex h-48 items-center justify-center rounded-lg border border-dashed border-border/60">
                <p className="text-sm text-muted-foreground">Traffic chart placeholder</p>
              </div>
            </CardContent>
          </Card>
          <Card className="animate-fade-up delay-200 hover-lift border-border/50">
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
