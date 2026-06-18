import api from '@/lib/api'
import type {
  UsersQueryParams,
  UsersResponse,
  DeletedUsersResponse,
  UserResponse,
} from '../types/adminType'
import type { GenericResponse } from '@/features/auth/types/authType'

export const adminService = {
  getUsers: async (params: UsersQueryParams): Promise<UsersResponse> => {
    // Filter out empty string values
    const filteredParams = Object.entries(params).reduce(
      (acc, [key, value]) => {
        if (value !== '' && value !== null && value !== undefined) {
          acc[key] = value
        }
        return acc
      },
      {} as Record<string, unknown>
    )

    const response = await api.get<UsersResponse>('/users', {
      params: filteredParams,
    })
    return response.data
  },

  deleteUser: async (id: string): Promise<GenericResponse> => {
    const response = await api.delete<GenericResponse>(`/users/${id}`)
    return response.data
  },

  // Recycle Bin endpoints
  getDeletedUsers: async (
    params: UsersQueryParams
  ): Promise<DeletedUsersResponse> => {
    // Filter out empty string values
    const filteredParams = Object.entries(params).reduce(
      (acc, [key, value]) => {
        if (value !== '' && value !== null && value !== undefined) {
          acc[key] = value
        }
        return acc
      },
      {} as Record<string, unknown>
    )

    const response = await api.get<DeletedUsersResponse>(
      '/users/deleted/list',
      {
        params: filteredParams,
      }
    )
    return response.data
  },

  restoreUser: async (id: string): Promise<UserResponse> => {
    const response = await api.post<UserResponse>(`/users/${id}/restore`)
    return response.data
  },

  permanentDeleteUser: async (id: string): Promise<GenericResponse> => {
    const response = await api.delete<GenericResponse>(`/users/${id}/permanent`)
    return response.data
  },
}
