import { Briefcase, CheckCircle, XCircle, Clock } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import type { StatusDistribution } from '../types/dashboardType'

interface StatsCardsProps {
  totalApplications: number
  statusDistribution: StatusDistribution
}

export default function StatsCards({
  totalApplications,
  statusDistribution,
}: StatsCardsProps) {
  const stats = [
    {
      label: 'Total Applications',
      value: totalApplications,
      icon: Briefcase,
      color: 'indigo',
    },
    {
      label: 'In Progress',
      value:
        (statusDistribution.APPLIED || 0) +
        (statusDistribution.SCREENING || 0) +
        (statusDistribution.INTERVIEW || 0),
      icon: Clock,
      color: 'yellow',
    },
    {
      label: 'Offers',
      value:
        (statusDistribution.OFFER || 0) + (statusDistribution.ACCEPTED || 0),
      icon: CheckCircle,
      color: 'green',
    },
    {
      label: 'Rejected',
      value: statusDistribution.REJECTED || 0,
      icon: XCircle,
      color: 'red',
    },
  ]

  const colorClasses = {
    indigo: 'bg-indigo-500/10 text-indigo-400 ring-indigo-500/30',
    yellow: 'bg-yellow-500/10 text-yellow-400 ring-yellow-500/30',
    green: 'bg-green-500/10 text-green-400 ring-green-500/30',
    red: 'bg-red-500/10 text-red-400 ring-red-500/30',
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <Card key={stat.label} className="transition-all hover:ring-zinc-700">
            <CardContent className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-muted-foreground text-sm font-medium">
                  {stat.label}
                </p>
                <p className="text-foreground mt-2 text-3xl font-bold">
                  {stat.value}
                </p>
              </div>
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-lg ring-1 ${
                  colorClasses[stat.color as keyof typeof colorClasses]
                }`}
              >
                <Icon className="h-6 w-6" />
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
