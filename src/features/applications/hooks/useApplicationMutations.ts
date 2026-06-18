import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { applicationService } from '../services/applicationService'
import { applicationKeys } from './useApplications'
import type {
  CreateApplicationPayload,
  UpdateApplicationPayload,
  ExtractUrlPayload,
  ApplicationResponse,
  ExtractUrlResponse,
  DeleteResponse,
} from '../types/applicationType'
import type { AxiosError } from 'axios'

export const useApplicationMutations = () => {
  const queryClient = useQueryClient()

  // Create application
  const createApplication = useMutation<
    ApplicationResponse,
    AxiosError<{ message?: string }>,
    CreateApplicationPayload
  >({
    mutationFn: (payload) => applicationService.createApplication(payload),
    onSuccess: (data) => {
      toast.success(data.message || 'Application created successfully!')
      queryClient.invalidateQueries({ queryKey: applicationKeys.lists() })
    },
    onError: (error) => {
      const message =
        error?.response?.data?.message || 'Failed to create application'
      toast.error(message)
    },
  })

  // Update application
  const updateApplication = useMutation<
    ApplicationResponse,
    AxiosError<{ message?: string }>,
    { id: string; payload: UpdateApplicationPayload }
  >({
    mutationFn: ({ id, payload }) =>
      applicationService.updateApplication(id, payload),
    onSuccess: (data, variables) => {
      toast.success(data.message || 'Application updated successfully!')
      queryClient.invalidateQueries({
        queryKey: applicationKeys.detail(variables.id),
      })
      queryClient.invalidateQueries({ queryKey: applicationKeys.lists() })
    },
    onError: (error) => {
      const message =
        error?.response?.data?.message || 'Failed to update application'
      toast.error(message)
    },
  })

  // Delete application (soft delete)
  const deleteApplication = useMutation<
    DeleteResponse,
    AxiosError<{ message?: string }>,
    string
  >({
    mutationFn: (id) => applicationService.deleteApplication(id),
    onSuccess: (data) => {
      toast.success(data.message || 'Application deleted successfully!')
      queryClient.invalidateQueries({ queryKey: applicationKeys.lists() })
      queryClient.invalidateQueries({ queryKey: applicationKeys.deleted() })
    },
    onError: (error) => {
      const message =
        error?.response?.data?.message || 'Failed to delete application'
      toast.error(message)
    },
  })

  // Restore application
  const restoreApplication = useMutation<
    ApplicationResponse,
    AxiosError<{ message?: string }>,
    string
  >({
    mutationFn: (id) => applicationService.restoreApplication(id),
    onSuccess: (data) => {
      toast.success(data.message || 'Application restored successfully!')
      queryClient.invalidateQueries({ queryKey: applicationKeys.lists() })
      queryClient.invalidateQueries({ queryKey: applicationKeys.deleted() })
    },
    onError: (error) => {
      const message =
        error?.response?.data?.message || 'Failed to restore application'
      toast.error(message)
    },
  })

  // Permanently delete application
  const permanentDeleteApplication = useMutation<
    DeleteResponse,
    AxiosError<{ message?: string }>,
    string
  >({
    mutationFn: (id) => applicationService.permanentDeleteApplication(id),
    onSuccess: (data) => {
      toast.success(data.message || 'Application permanently deleted!')
      queryClient.invalidateQueries({ queryKey: applicationKeys.deleted() })
    },
    onError: (error) => {
      const message =
        error?.response?.data?.message ||
        'Failed to permanently delete application'
      toast.error(message)
    },
  })

  // Extract URL
  const extractUrl = useMutation<
    ExtractUrlResponse,
    AxiosError<{ message?: string }>,
    ExtractUrlPayload
  >({
    mutationFn: (payload) => applicationService.extractUrl(payload),
    onSuccess: (data) => {
      toast.success(data.message || 'Job details extracted successfully!')
    },
    onError: (error) => {
      const message =
        error?.response?.data?.message || 'Failed to extract job details'
      toast.error(message)
    },
  })

  return {
    createApplication,
    updateApplication,
    deleteApplication,
    restoreApplication,
    permanentDeleteApplication,
    extractUrl,
  }
}
