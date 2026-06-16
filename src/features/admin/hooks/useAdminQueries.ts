import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { adminService } from '../services/adminService'
import type { UsersQueryParams, UsersResponse } from '../types/adminType'
import type { AxiosError } from 'axios'

export function useUsers(params: UsersQueryParams) {
  return useQuery<UsersResponse, AxiosError<{ message?: string }>>({
    queryKey: ['admin', 'users', params],
    queryFn: () => adminService.getUsers(params),
    placeholderData: (prev) => prev,
  })
}

export function useDeleteUser(onSuccess?: () => void) {
  const queryClient = useQueryClient()

  return useMutation<
    { message: string },
    AxiosError<{ message?: string }>,
    string
  >({
    mutationFn: (id: string) => adminService.deleteUser(id),
    onSuccess: () => {
      toast.success('User deleted successfully')
      queryClient.invalidateQueries({ queryKey: ['admin', 'users'] })
      onSuccess?.()
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message ||
          'Failed to delete user. Please try again.'
      )
    },
  })
}
