import { useQuery } from '@tanstack/react-query'
import { dashboardService } from '../services/dashboardService'
import type { DashboardStatsResponse } from '../types/dashboardType'
import type { AxiosError } from 'axios'

// Query keys
export const dashboardKeys = {
  all: ['dashboard'] as const,
  stats: () => [...dashboardKeys.all, 'stats'] as const,
}

// Get dashboard stats
export const useDashboardStats = () => {
  return useQuery<DashboardStatsResponse, AxiosError<{ message?: string }>>({
    queryKey: dashboardKeys.stats(),
    queryFn: () => dashboardService.getStats(),
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: true,
  })
}
