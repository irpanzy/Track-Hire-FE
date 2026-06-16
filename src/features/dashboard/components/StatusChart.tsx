import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card'
import type { StatusDistribution } from '../types/dashboardType'

interface StatusChartProps {
  statusDistribution: StatusDistribution
}

export default function StatusChart({ statusDistribution }: StatusChartProps) {
  const statuses = Object.entries(statusDistribution).map(
    ([status, count]) => ({
      status,
      count,
    })
  )

  const total = statuses.reduce((sum, item) => sum + item.count, 0)

  const statusColors: Record<string, string> = {
    APPLIED: 'bg-blue-500',
    SCREENING: 'bg-yellow-500',
    INTERVIEW: 'bg-purple-500',
    OFFER: 'bg-green-500',
    REJECTED: 'bg-red-500',
    WITHDRAWN: 'bg-zinc-500',
    ACCEPTED: 'bg-emerald-500',
  }

  return (
    <Card>
      <CardHeader className="items-center pb-4">
        <CardTitle>Status Distribution</CardTitle>
        <CardDescription>Breakdown by application status</CardDescription>
      </CardHeader>
      <CardContent>
        {statuses.length > 0 ? (
          <div className="space-y-3">
            {statuses.map((item) => {
              const percentage = ((item.count / total) * 100).toFixed(1)
              return (
                <div key={item.status} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-foreground font-medium">
                      {item.status}
                    </span>
                    <span className="text-muted-foreground">
                      {item.count} ({percentage}%)
                    </span>
                  </div>
                  <div className="bg-muted h-2 overflow-hidden rounded-full">
                    <div
                      className={`h-full transition-all ${
                        statusColors[item.status] || 'bg-zinc-600'
                      }`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <p className="text-muted-foreground text-center text-sm">
            No data available
          </p>
        )}
      </CardContent>
    </Card>
  )
}
