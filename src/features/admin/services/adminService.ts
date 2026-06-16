import { api } from '@/lib/api'
import type { UsersQueryParams, UsersResponse } from '../types/adminType'
import type { GenericResponse } from '@/features/auth/types/authType'

export const adminService = {
  getUsers: async (params: UsersQueryParams): Promise<UsersResponse> => {
    const response = await api.get<UsersResponse>('/users', { params })
    return response.data
  },

  deleteUser: async (id: string): Promise<GenericResponse> => {
    const response = await api.delete<GenericResponse>(`/users/${id}`)
    return response.data
  },
}
