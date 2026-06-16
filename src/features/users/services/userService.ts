import api from '@/lib/api'
import type {
  UsersResponse,
  UserResponse,
  UpdateUserPayload,
  AvatarResponse,
  DeleteResponse,
  PaginationParams,
} from '../types/userTypes'

export const userService = {
  // Get all users (Admin only)
  getAllUsers: async (params?: PaginationParams): Promise<UsersResponse> => {
    const { data } = await api.get('/users', { params })
    return data
  },

  // Get user profile by ID
  getUserById: async (userId: string): Promise<UserResponse> => {
    const { data } = await api.get(`/users/${userId}`)
    return data
  },

  // Update user profile
  updateUser: async (
    userId: string,
    payload: UpdateUserPayload
  ): Promise<UserResponse> => {
    const { data } = await api.put(`/users/${userId}`, payload)
    return data
  },

  // Upload avatar
  uploadAvatar: async (userId: string, file: File): Promise<AvatarResponse> => {
    const formData = new FormData()
    formData.append('avatar', file)

    const { data } = await api.put(`/users/${userId}/avatar`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return data
  },

  // Delete avatar
  deleteAvatar: async (userId: string): Promise<AvatarResponse> => {
    const { data } = await api.delete(`/users/${userId}/avatar`)
    return data
  },

  // Delete user (Admin only - soft delete)
  deleteUser: async (userId: string): Promise<DeleteResponse> => {
    const { data } = await api.delete(`/users/${userId}`)
    return data
  },
}
