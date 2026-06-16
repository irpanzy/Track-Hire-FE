export interface StatusDistribution {
  APPLIED?: number
  SCREENING?: number
  INTERVIEW?: number
  OFFER?: number
  REJECTED?: number
  WITHDRAWN?: number
  ACCEPTED?: number
}

export interface SourceDistribution {
  LINKEDIN?: number
  GLINTS?: number
  JOBSTREET?: number
  UPWORK?: number
  INDEED?: number
  WEBSITE?: number
  INSTAGRAM?: number
  X?: number
  OTHER?: number
}

export interface RecentApplication {
  id: string
  position: string
  status: string
  appliedDate: string
  company: {
    name: string
  }
}

export interface MonthlyTrend {
  month: string
  count: number
}

export interface DashboardStats {
  totalApplications: number
  statusDistribution: StatusDistribution
  sourceDistribution: SourceDistribution
  recentApplications: RecentApplication[]
  monthlyTrend: MonthlyTrend[]
}

export interface DashboardStatsResponse {
  message: string
  data: DashboardStats
}
