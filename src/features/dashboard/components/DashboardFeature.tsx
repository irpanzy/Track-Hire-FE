import { Loader2 } from 'lucide-react'
import { useDashboardStats } from '../hooks/useDashboard'
import StatsCards from './StatsCards'
import StatusChart from './StatusChart'
import MonthlyTrendChart from './MonthlyTrendChart'
import SourceChart from './SourceChart'
import RecentApplications from './RecentApplications'

export default function DashboardFeature() {
  const { data, isLoading, isError } = useDashboardStats()

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-500" />
      </div>
    )
  }

  if (isError || !data) {
    return (
      <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-8 text-center">
        <p className="text-zinc-400">Failed to load dashboard stats</p>
      </div>
    )
  }

  const stats = data.data

  return (
    <div className="animate-fade-in space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white">
          Dashboard
        </h1>
        <p className="mt-1 text-zinc-400">
          Overview of your job application tracking
        </p>
      </div>

      {/* Stats Cards */}
      <StatsCards
        totalApplications={stats.totalApplications}
        statusDistribution={stats.statusDistribution}
      />

      {/* Charts Row */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <StatusChart statusDistribution={stats.statusDistribution} />
        <SourceChart sourceDistribution={stats.sourceDistribution} />
      </div>

      {/* Monthly Trend & Recent Applications Row */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <MonthlyTrendChart monthlyTrend={stats.monthlyTrend} />
        <div className="lg:col-span-2">
          <RecentApplications applications={stats.recentApplications} />
        </div>
      </div>
    </div>
  )
}
