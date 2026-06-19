import { Loader2 } from 'lucide-react'
import { useDashboardStats } from '../hooks/useDashboard'
import StatsCards from './StatsCards'
import StatusChart from './StatusChart'
import MonthlyTrendChart from './MonthlyTrendChart'
import SourceChart from './SourceChart'
import RecentApplications from './RecentApplications'
import { RetroWindow } from '@/components/ui/retro-window'
import retroDashboardIcon from '@/assets/retro-dashboard.png'

export default function DashboardFeature() {
  const { data, isLoading, isError } = useDashboardStats()

  if (isLoading) {
    return (
      <div className="flex h-96 flex-col items-center justify-center gap-3">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-500" />
        <p className="text-sm text-zinc-500">Loading dashboard...</p>
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
      {/* Retro Window Header */}
      <RetroWindow
        title="Dashboard"
        icon={
          <img
            src={retroDashboardIcon}
            alt="Dashboard"
            className="mt-1 h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7"
          />
        }
        count={stats.totalApplications}
      >
        <p className="font-mono text-xs text-zinc-500">
          Overview of your job application tracking
        </p>
      </RetroWindow>

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
