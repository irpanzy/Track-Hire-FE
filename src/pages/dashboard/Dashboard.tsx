import { useEffect, useState } from 'react'
import {
  Briefcase,
  Calendar,
  CheckCircle2,
  Clock,
  Landmark,
  TrendingUp,
} from 'lucide-react'
import { getMockApplications, type MockApplication } from '../../lib/mockData'
import { Link } from 'react-router-dom'

export default function Dashboard() {
  const [applications, setApplications] = useState<MockApplication[]>([])

  useEffect(() => {
    setApplications(getMockApplications())
  }, [])

  // Calculate metrics
  const totalApps = applications.length

  const interviewingApps = applications.filter((app) =>
    ['Interviewing', 'Screening', 'Technical Test', 'HR Interview'].includes(
      app.status
    )
  ).length

  const offeredApps = applications.filter((app) =>
    ['Offered', 'Offering', 'Accepted'].includes(app.status)
  ).length

  const rejectedApps = applications.filter(
    (app) => app.status === 'Rejected'
  ).length

  const stats = [
    {
      label: 'Total Applications',
      count: totalApps,
      icon: Briefcase,
      color: 'text-indigo-400',
      bg: 'bg-indigo-500/10',
    },
    {
      label: 'Interviewing',
      count: interviewingApps,
      icon: Clock,
      color: 'text-amber-400',
      bg: 'bg-amber-500/10',
    },
    {
      label: 'Offered',
      count: offeredApps,
      icon: CheckCircle2,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
    },
    {
      label: 'Rejected',
      count: rejectedApps,
      icon: Landmark,
      color: 'text-red-400',
      bg: 'bg-red-500/10',
    },
  ]

  // Sort by date descending and take top 4
  const recentApplications = [...applications]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 4)

  // Generate monthly trend for last 4 months
  const getMonthlyTrend = () => {
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ]
    const trendMap: Record<string, number> = {}

    // Initialize last 4 months
    const last4Months: { name: string; key: number; year: number }[] = []
    const now = new Date()
    for (let i = 3; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
      const label = `${months[d.getMonth()]} ${String(d.getFullYear()).slice(-2)}`
      last4Months.push({
        name: label,
        key: d.getMonth(),
        year: d.getFullYear(),
      })
      trendMap[label] = 0
    }

    // Populate counts
    applications.forEach((app) => {
      const appDate = new Date(app.date)
      if (isNaN(appDate.getTime())) return
      const appMonth = appDate.getMonth()
      const appYear = appDate.getFullYear()

      const match = last4Months.find(
        (m) => m.key === appMonth && m.year === appYear
      )
      if (match) {
        trendMap[match.name]++
      }
    })

    return last4Months.map((m) => ({
      month: m.name,
      count: trendMap[m.name] || 0,
    }))
  }

  const trendData = getMonthlyTrend()
  const maxCount = Math.max(...trendData.map((d) => d.count), 1)

  return (
    <div className="animate-fade-in space-y-8">
      {/* Welcome Message */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white">
          Overview
        </h1>
        <p className="mt-1 text-zinc-400">
          Here is a summary of your job search progress.
        </p>
      </div>

      {/* Grid of Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div
              key={stat.label}
              className="rounded-xl border border-zinc-800 bg-zinc-900 p-5 shadow-sm transition-colors hover:border-zinc-700"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-zinc-400">
                  {stat.label}
                </span>
                <div className={`${stat.bg} ${stat.color} rounded-lg p-2`}>
                  <Icon className="h-5 w-5" />
                </div>
              </div>
              <p className="mt-2 text-3xl font-bold tracking-tight text-white">
                {stat.count}
              </p>
            </div>
          )
        })}
      </div>

      {/* Main layout split (Recent applications & analytics) */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Recent Applications Card */}
        <div className="space-y-6 rounded-xl border border-zinc-800 bg-zinc-900 p-6 shadow-sm lg:col-span-2">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white">
              Recent Applications
            </h3>
            <Link
              to="/applications"
              className="text-xs text-indigo-400 hover:text-indigo-300 hover:underline"
            >
              View all
            </Link>
          </div>

          <div className="divide-y divide-zinc-800">
            {recentApplications.length > 0 ? (
              recentApplications.map((app) => (
                <div
                  key={app.id}
                  className="flex items-center justify-between py-4 first:pt-0 last:pb-0"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-950 text-base font-bold text-white">
                      {app.company[0]?.toUpperCase()}
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white">
                        {app.role}
                      </h4>
                      <p className="text-xs text-zinc-400">{app.company}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="hidden text-right sm:block">
                      <p className="flex items-center gap-1 text-xs text-zinc-400">
                        <Calendar className="h-3 w-3" />
                        {new Date(app.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </p>
                    </div>
                    <span
                      className={`inline-flex items-center rounded-md px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${
                        ['Offered', 'Offering', 'Accepted'].includes(app.status)
                          ? 'bg-emerald-500/10 text-emerald-400 ring-emerald-500/20'
                          : [
                                'Interviewing',
                                'Screening',
                                'Technical Test',
                                'HR Interview',
                              ].includes(app.status)
                            ? 'bg-amber-500/10 text-amber-400 ring-amber-500/20'
                            : app.status === 'Rejected'
                              ? 'bg-red-500/10 text-red-400 ring-red-500/20'
                              : 'bg-indigo-500/10 text-indigo-400 ring-indigo-500/20'
                      }`}
                    >
                      {app.status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-zinc-550 py-8 text-center text-sm">
                No applications found. Add some in the Applications tab!
              </div>
            )}
          </div>
        </div>

        {/* Analytics Card */}
        <div className="flex flex-col justify-between space-y-6 rounded-xl border border-zinc-800 bg-zinc-900 p-6 shadow-sm">
          <div>
            <h3 className="flex items-center gap-2 text-lg font-bold text-white">
              <TrendingUp className="h-5 w-5 text-indigo-400" />
              Activity Trend
            </h3>
            <p className="mt-1 text-xs text-zinc-400">
              Monthly metrics of your application submission rate.
            </p>
          </div>

          <div className="flex h-36 items-end justify-between gap-3 py-6">
            {trendData.map((d, index) => {
              const heightPercent = Math.max((d.count / maxCount) * 100, 8) // Minimum height to make bar visible
              const isCurrentMonth = index === trendData.length - 1
              return (
                <div
                  key={d.month}
                  className="group flex h-full flex-1 flex-col items-center justify-end gap-2"
                >
                  <div className="relative flex w-full justify-center">
                    {/* Tooltip on hover */}
                    <div className="pointer-events-none absolute bottom-full mb-1 rounded border border-zinc-800 bg-zinc-950 px-2 py-0.5 text-[10px] whitespace-nowrap text-white opacity-0 shadow-md transition-opacity group-hover:opacity-100">
                      {d.count} application{d.count !== 1 ? 's' : ''}
                    </div>
                    <div
                      style={{ height: `${heightPercent}%` }}
                      className={`w-full max-w-[28px] rounded-t transition-all duration-300 ${
                        isCurrentMonth
                          ? 'bg-indigo-600 shadow-lg shadow-indigo-600/15 group-hover:bg-indigo-500'
                          : 'bg-zinc-800 group-hover:bg-zinc-700'
                      }`}
                    />
                  </div>
                </div>
              )
            })}
          </div>

          <div className="flex justify-between border-t border-zinc-800 pt-2 text-xs text-zinc-500">
            {trendData.map((d, index) => {
              const isCurrentMonth = index === trendData.length - 1
              return (
                <span
                  key={d.month}
                  className={
                    isCurrentMonth ? 'font-semibold text-indigo-400' : ''
                  }
                >
                  {d.month.split(' ')[0]}
                </span>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
