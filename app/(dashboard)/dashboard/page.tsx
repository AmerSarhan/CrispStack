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
          {stats.map((stat, i) => (
            <Card key={stat.title} className={`animate-fade-up delay-${(i + 1) * 100} hover-lift border-border/50`}>
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
        <Card className="animate-fade-up delay-500 border-border/50">
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
