import { useQuery } from '@tanstack/react-query'
import { applicationService } from '../services/applicationService'
import type {
  ApplicationsQueryParams,
  ApplicationsResponse,
  ApplicationResponse,
} from '../types/applicationType'
import type { AxiosError } from 'axios'

// Query keys
export const applicationKeys = {
  all: ['applications'] as const,
  lists: () => [...applicationKeys.all, 'list'] as const,
  list: (params?: ApplicationsQueryParams) =>
    [...applicationKeys.lists(), params] as const,
  details: () => [...applicationKeys.all, 'detail'] as const,
  detail: (id: string) => [...applicationKeys.details(), id] as const,
  deleted: () => [...applicationKeys.all, 'deleted'] as const,
  deletedList: (params?: ApplicationsQueryParams) =>
    [...applicationKeys.deleted(), params] as const,
}

// Get all applications
export const useApplications = (params?: ApplicationsQueryParams) => {
  return useQuery<ApplicationsResponse, AxiosError<{ message?: string }>>({
    queryKey: applicationKeys.list(params),
    queryFn: () => applicationService.getApplications(params || {}),
    placeholderData: (prev) => prev,
  })
}

// Get application by ID
export const useApplication = (id: string | undefined) => {
  return useQuery<ApplicationResponse, AxiosError<{ message?: string }>>({
    queryKey: applicationKeys.detail(id || ''),
    queryFn: () => applicationService.getApplicationById(id!),
    enabled: !!id,
  })
}

// Get deleted applications
export const useDeletedApplications = (params?: ApplicationsQueryParams) => {
  return useQuery<ApplicationsResponse, AxiosError<{ message?: string }>>({
    queryKey: applicationKeys.deletedList(params),
    queryFn: () => applicationService.getDeletedApplications(params || {}),
    placeholderData: (prev) => prev,
  })
}
