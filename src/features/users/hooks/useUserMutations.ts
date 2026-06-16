import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { userService } from '../services/userService'
import { userKeys } from './useUsers'
import { useAuthStore } from '@/features/auth'
import type { UpdateUserPayload } from '../types/userTypes'

export const useUserMutations = () => {
  const queryClient = useQueryClient()
  const setUser = useAuthStore((state) => state.setUser)

  // Update user profile
  const updateUser = useMutation({
    mutationFn: ({
      userId,
      payload,
    }: {
      userId: string
      payload: UpdateUserPayload
    }) => userService.updateUser(userId, payload),
    onSuccess: (data, variables) => {
      toast.success(data.message || 'Profile updated successfully!')

      // Update auth store if updating self
      const currentUser = useAuthStore.getState().user
      if (currentUser?.id === variables.userId) {
        setUser(data.user)
      }

      // Invalidate queries
      queryClient.invalidateQueries({
        queryKey: userKeys.detail(variables.userId),
      })
      queryClient.invalidateQueries({ queryKey: userKeys.lists() })
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message || 'Failed to update profile'
      toast.error(message)
    },
  })

  // Upload avatar
  const uploadAvatar = useMutation({
    mutationFn: ({ userId, file }: { userId: string; file: File }) =>
      userService.uploadAvatar(userId, file),
    onSuccess: (data, variables) => {
      toast.success(data.message || 'Avatar uploaded successfully!')

      // Update auth store if updating self
      const currentUser = useAuthStore.getState().user
      if (currentUser?.id === variables.userId) {
        setUser(data.user)
      }

      // Invalidate queries
      queryClient.invalidateQueries({
        queryKey: userKeys.detail(variables.userId),
      })
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message || 'Failed to upload avatar'
      toast.error(message)
    },
  })

  // Delete avatar
  const deleteAvatar = useMutation({
    mutationFn: (userId: string) => userService.deleteAvatar(userId),
    onSuccess: (data, userId) => {
      toast.success(data.message || 'Avatar deleted successfully!')

      // Update auth store if deleting self
      const currentUser = useAuthStore.getState().user
      if (currentUser?.id === userId) {
        setUser(data.user)
      }

      // Invalidate queries
      queryClient.invalidateQueries({ queryKey: userKeys.detail(userId) })
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message || 'Failed to delete avatar'
      toast.error(message)
    },
  })

  // Delete user (Admin only)
  const deleteUser = useMutation({
    mutationFn: (userId: string) => userService.deleteUser(userId),
    onSuccess: (data) => {
      toast.success(data.message || 'User deleted successfully!')
      // Invalidate lists
      queryClient.invalidateQueries({ queryKey: userKeys.lists() })
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || 'Failed to delete user'
      toast.error(message)
    },
  })

  return {
    updateUser,
    uploadAvatar,
    deleteAvatar,
    deleteUser,
  }
}
