import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card'
import type { SourceDistribution } from '../types/dashboardType'

interface SourceChartProps {
  sourceDistribution: SourceDistribution
}

export default function SourceChart({ sourceDistribution }: SourceChartProps) {
  const sources = Object.entries(sourceDistribution).map(([source, count]) => ({
    source,
    count,
  }))

  const total = sources.reduce((sum, item) => sum + item.count, 0)

  const sourceColors = [
    'bg-indigo-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-blue-500',
    'bg-cyan-500',
    'bg-teal-500',
    'bg-green-500',
    'bg-yellow-500',
    'bg-orange-500',
  ]

  return (
    <Card>
      <CardHeader className="items-center pb-4">
        <CardTitle>Source Distribution</CardTitle>
        <CardDescription>Breakdown by application source</CardDescription>
      </CardHeader>
      <CardContent>
        {sources.length > 0 ? (
          <div className="space-y-3">
            {sources.map((item, index) => {
              const percentage = ((item.count / total) * 100).toFixed(1)
              return (
                <div key={item.source} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-foreground font-medium">
                      {item.source}
                    </span>
                    <span className="text-muted-foreground">
                      {item.count} ({percentage}%)
                    </span>
                  </div>
                  <div className="bg-muted h-2 overflow-hidden rounded-full">
                    <div
                      className={`h-full transition-all ${
                        sourceColors[index % sourceColors.length]
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
