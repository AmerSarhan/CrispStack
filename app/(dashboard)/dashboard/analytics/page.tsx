import { DashboardHeader } from "@/components/dashboard/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const donutSegments = [
  { label: "Direct", value: 42, color: "bg-primary" },
  { label: "Organic", value: 28, color: "bg-primary/70" },
  { label: "Referral", value: 18, color: "bg-primary/40" },
  { label: "Social", value: 12, color: "bg-primary/20" },
]

const metrics = [
  { label: "Avg. Session Duration", value: "4m 32s", change: "+12%" },
  { label: "Bounce Rate", value: "32.4%", change: "-5.2%" },
  { label: "Pages per Session", value: "3.8", change: "+8%" },
  { label: "New vs Returning", value: "62/38%", change: "+3%" },
]

const hourlyData = [
  2, 3, 1, 1, 2, 5, 12, 28, 42, 55, 48, 52,
  60, 58, 45, 50, 62, 70, 55, 38, 25, 18, 8, 4,
]

const deviceData = [
  { device: "Desktop", sessions: 14200, percentage: 58 },
  { device: "Mobile", sessions: 8100, percentage: 33 },
  { device: "Tablet", sessions: 2200, percentage: 9 },
]

const countryData = [
  { country: "United States", flag: "🇺🇸", users: 8420, percentage: 35 },
  { country: "United Kingdom", flag: "🇬🇧", users: 4210, percentage: 17 },
  { country: "Germany", flag: "🇩🇪", users: 3100, percentage: 13 },
  { country: "Canada", flag: "🇨🇦", users: 2400, percentage: 10 },
  { country: "France", flag: "🇫🇷", users: 1800, percentage: 7 },
  { country: "Other", flag: "🌍", users: 4270, percentage: 18 },
]

export default function AnalyticsPage() {
  const maxHourly = Math.max(...hourlyData)

  return (
    <>
      <DashboardHeader title="Analytics" />
      <div className="flex-1 space-y-6 p-4 sm:p-6">
        {/* Key Metrics */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric, i) => (
            <Card key={metric.label} className={`animate-fade-up delay-${(i + 1) * 100} hover-lift border-border/50`}>
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground">{metric.label}</p>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-2xl font-bold">{metric.value}</span>
                  <Badge variant="secondary" className="text-xs font-normal">
                    <span className={metric.change.startsWith("+") ? "text-emerald-500" : "text-red-500"}>
                      {metric.change}
                    </span>
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-7">
          {/* Hourly Traffic Sparkline */}
          <Card className="animate-fade-up delay-500 border-border/50 lg:col-span-4">
            <CardHeader>
              <CardTitle className="text-lg">Hourly Traffic</CardTitle>
              <CardDescription>Visitors by hour of day (today)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex h-40 items-end gap-[3px]">
                {hourlyData.map((value, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-sm bg-primary/70 transition-all hover:bg-primary"
                    style={{ height: `${(value / maxHourly) * 100}%` }}
                    title={`${i}:00 — ${value} visitors`}
                  />
                ))}
              </div>
              <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                <span>12am</span>
                <span>6am</span>
                <span>12pm</span>
                <span>6pm</span>
                <span>11pm</span>
              </div>
            </CardContent>
          </Card>

          {/* Traffic Sources */}
          <Card className="animate-fade-up delay-600 border-border/50 lg:col-span-3">
            <CardHeader>
              <CardTitle className="text-lg">Traffic Sources</CardTitle>
              <CardDescription>Where your visitors come from</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex h-3 w-full overflow-hidden rounded-full">
                {donutSegments.map((seg) => (
                  <div
                    key={seg.label}
                    className={`${seg.color} transition-all`}
                    style={{ width: `${seg.value}%` }}
                  />
                ))}
              </div>
              <div className="mt-6 space-y-3">
                {donutSegments.map((seg) => (
                  <div key={seg.label} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`h-2.5 w-2.5 rounded-full ${seg.color}`} />
                      <span className="text-sm">{seg.label}</span>
                    </div>
                    <span className="text-sm font-medium">{seg.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Devices */}
          <Card className="animate-fade-up delay-700 border-border/50">
            <CardHeader>
              <CardTitle className="text-lg">Devices</CardTitle>
              <CardDescription>Sessions by device type</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {deviceData.map((device) => (
                  <div key={device.device} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>{device.device}</span>
                      <span className="font-medium">{device.sessions.toLocaleString()} <span className="text-muted-foreground font-normal">({device.percentage}%)</span></span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-primary transition-all"
                        style={{ width: `${device.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Countries */}
          <Card className="animate-fade-up delay-700 border-border/50">
            <CardHeader>
              <CardTitle className="text-lg">Top Countries</CardTitle>
              <CardDescription>Users by location</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {countryData.map((country) => (
                  <div key={country.country} className="flex items-center gap-3 rounded-lg px-1 py-1.5 transition-colors hover:bg-muted/50">
                    <span className="text-lg">{country.flag}</span>
                    <span className="flex-1 text-sm">{country.country}</span>
                    <span className="text-sm font-medium">{country.users.toLocaleString()}</span>
                    <div className="w-16">
                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                        <div
                          className="h-full rounded-full bg-primary"
                          style={{ width: `${country.percentage * 2.85}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
