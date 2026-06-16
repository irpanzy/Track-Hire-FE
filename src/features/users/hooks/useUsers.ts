import { useQuery } from '@tanstack/react-query'
import { userService } from '../services/userService'
import type { PaginationParams } from '../types/userTypes'

// Query keys
export const userKeys = {
  all: ['users'] as const,
  lists: () => [...userKeys.all, 'list'] as const,
  list: (params?: PaginationParams) => [...userKeys.lists(), params] as const,
  details: () => [...userKeys.all, 'detail'] as const,
  detail: (id: string) => [...userKeys.details(), id] as const,
}

// Get all users (Admin only)
export const useUsers = (params?: PaginationParams) => {
  return useQuery({
    queryKey: userKeys.list(params),
    queryFn: () => userService.getAllUsers(params),
  })
}

// Get user by ID
export const useUser = (userId: string | undefined) => {
  return useQuery({
    queryKey: userKeys.detail(userId || ''),
    queryFn: () => userService.getUserById(userId!),
    enabled: !!userId,
  })
}
