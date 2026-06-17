import api from '@/lib/api'
import type {
  ApplicationsQueryParams,
  ApplicationsResponse,
  ApplicationResponse,
  CreateApplicationPayload,
  UpdateApplicationPayload,
  ExtractUrlPayload,
  ExtractUrlResponse,
  DeleteResponse,
} from '../types/applicationType'

export const applicationService = {
  // List applications
  getApplications: async (
    params: ApplicationsQueryParams
  ): Promise<ApplicationsResponse> => {
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

    const response = await api.get<ApplicationsResponse>('/applications', {
      params: filteredParams,
    })
    return response.data
  },

  // Get application by ID
  getApplicationById: async (id: string): Promise<ApplicationResponse> => {
    const response = await api.get<ApplicationResponse>(`/applications/${id}`)
    return response.data
  },

  // Create application
  createApplication: async (
    payload: CreateApplicationPayload
  ): Promise<ApplicationResponse> => {
    const response = await api.post<ApplicationResponse>(
      '/applications',
      payload
    )
    return response.data
  },

  // Update application
  updateApplication: async (
    id: string,
    payload: UpdateApplicationPayload
  ): Promise<ApplicationResponse> => {
    const response = await api.put<ApplicationResponse>(
      `/applications/${id}`,
      payload
    )
    return response.data
  },

  // Delete application
  deleteApplication: async (id: string): Promise<DeleteResponse> => {
    const response = await api.delete<DeleteResponse>(`/applications/${id}`)
    return response.data
  },

  // Get deleted applications
  getDeletedApplications: async (
    params: ApplicationsQueryParams
  ): Promise<ApplicationsResponse> => {
    const filteredParams = Object.entries(params).reduce(
      (acc, [key, value]) => {
        if (value !== '' && value !== null && value !== undefined) {
          acc[key] = value
        }
        return acc
      },
      {} as Record<string, unknown>
    )

    const response = await api.get<ApplicationsResponse>(
      '/applications/deleted/list',
      {
        params: filteredParams,
      }
    )
    return response.data
  },

  // Restore application
  restoreApplication: async (id: string): Promise<ApplicationResponse> => {
    const response = await api.post<ApplicationResponse>(
      `/applications/${id}/restore`
    )
    return response.data
  },

  // Permanently delete application
  permanentDeleteApplication: async (id: string): Promise<DeleteResponse> => {
    const response = await api.delete<DeleteResponse>(
      `/applications/${id}/permanent`
    )
    return response.data
  },

  // Extract job details from URL
  extractUrl: async (
    payload: ExtractUrlPayload
  ): Promise<ExtractUrlResponse> => {
    const response = await api.post<ExtractUrlResponse>(
      '/applications/extract-url',
      payload
    )
    return response.data
  },
}
