import api from '@/lib/api'
import type { DashboardStatsResponse } from '../types/dashboardType'

export const dashboardService = {
  getStats: async (): Promise<DashboardStatsResponse> => {
    const response = await api.get<DashboardStatsResponse>('/dashboard/stats')
    return response.data
  },
}
