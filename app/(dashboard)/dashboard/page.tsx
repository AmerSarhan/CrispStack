import { DashboardHeader } from "@/components/dashboard/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const stats = [
  { title: "Total Users", value: "2,420", change: "+12.5%", trend: "up" },
  { title: "Active Sessions", value: "1,210", change: "+8.2%", trend: "up" },
  { title: "Revenue", value: "$45,231", change: "+20.1%", trend: "up" },
  { title: "Conversion Rate", value: "3.2%", change: "-0.4%", trend: "down" },
]

const barData = [
  { label: "Mon", value: 65 },
  { label: "Tue", value: 45 },
  { label: "Wed", value: 78 },
  { label: "Thu", value: 52 },
  { label: "Fri", value: 90 },
  { label: "Sat", value: 35 },
  { label: "Sun", value: 60 },
]

const recentActivity = [
  { name: "Sarah Chen", action: "signed up", time: "2 min ago", initials: "SC" },
  { name: "Marcus R.", action: "upgraded to Pro", time: "15 min ago", initials: "MR" },
  { name: "Emily Park", action: "created a project", time: "1 hr ago", initials: "EP" },
  { name: "Jake Wilson", action: "invited a team member", time: "3 hrs ago", initials: "JW" },
  { name: "Ana Lopez", action: "deployed to production", time: "5 hrs ago", initials: "AL" },
]

const topPages = [
  { page: "/", views: 12420, change: "+14.2%" },
  { page: "/pricing", views: 8350, change: "+7.8%" },
  { page: "/features", views: 6210, change: "+22.1%" },
  { page: "/docs/getting-started", views: 4180, change: "+3.5%" },
  { page: "/blog/launch-week", views: 3920, change: "+45.0%" },
]

export default function DashboardPage() {
  const maxBarValue = Math.max(...barData.map((d) => d.value))

  return (
    <>
      <DashboardHeader title="Overview" />
      <div className="flex-1 space-y-6 p-4 sm:p-6">
        {/* Stats */}
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
                  <span className={stat.trend === "up" ? "text-emerald-500" : "text-red-500"}>
                    {stat.change}
                  </span>{" "}
                  from last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-7">
          {/* Bar Chart */}
          <Card className="animate-fade-up delay-500 border-border/50 lg:col-span-4">
            <CardHeader>
              <CardTitle className="text-lg">Weekly Traffic</CardTitle>
              <CardDescription>Page views over the last 7 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex h-52 items-end gap-3">
                {barData.map((bar, i) => (
                  <div key={bar.label} className="flex flex-1 flex-col items-center gap-2">
                    <span className="text-xs font-medium text-muted-foreground">{bar.value}</span>
                    <div
                      className={`animate-fade-up delay-${(i + 1) * 100} w-full rounded-md bg-primary/80 transition-all hover:bg-primary`}
                      style={{ height: `${(bar.value / maxBarValue) * 100}%` }}
                    />
                    <span className="text-xs text-muted-foreground">{bar.label}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="animate-fade-up delay-600 border-border/50 lg:col-span-3">
            <CardHeader>
              <CardTitle className="text-lg">Recent Activity</CardTitle>
              <CardDescription>Latest user actions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((item, i) => (
                  <div key={i} className={`animate-fade-up delay-${(i + 1) * 100} flex items-center gap-3`}>
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary/10 text-xs font-medium text-primary">
                        {item.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm truncate">
                        <span className="font-medium">{item.name}</span>{" "}
                        <span className="text-muted-foreground">{item.action}</span>
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">{item.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Top Pages Table */}
        <Card className="animate-fade-up delay-700 border-border/50">
          <CardHeader>
            <CardTitle className="text-lg">Top Pages</CardTitle>
            <CardDescription>Most visited pages this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="grid grid-cols-12 text-xs font-medium text-muted-foreground">
                <span className="col-span-6">Page</span>
                <span className="col-span-3 text-right">Views</span>
                <span className="col-span-3 text-right">Change</span>
              </div>
              {topPages.map((page, i) => (
                <div key={page.page} className={`animate-fade-up delay-${(i + 1) * 100} grid grid-cols-12 items-center rounded-lg px-2 py-2.5 transition-colors hover:bg-muted/50`}>
                  <span className="col-span-6 truncate font-mono text-sm">{page.page}</span>
                  <span className="col-span-3 text-right text-sm font-medium">{page.views.toLocaleString()}</span>
                  <span className="col-span-3 text-right">
                    <Badge variant="secondary" className="text-xs font-normal">
                      <span className="text-emerald-500">{page.change}</span>
                    </Badge>
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
