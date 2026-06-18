import api from '@/lib/api'
import type {
  RemindersQueryParams,
  DeletedRemindersQueryParams,
  RemindersResponse,
  ReminderResponse,
  CreateReminderPayload,
  UpdateReminderPayload,
  DeleteResponse,
} from '../types/reminderType'

const filterParams = (params: Record<string, unknown>) =>
  Object.entries(params).reduce(
    (acc, [key, value]) => {
      if (value !== '' && value !== null && value !== undefined) {
        acc[key] = value
      }
      return acc
    },
    {} as Record<string, unknown>
  )

export const reminderService = {
  // List reminders
  getReminders: async (
    params: RemindersQueryParams
  ): Promise<RemindersResponse> => {
    const response = await api.get<RemindersResponse>('/reminders', {
      params: filterParams(params as Record<string, unknown>),
    })
    return response.data
  },

  // Get reminder by ID
  getReminderById: async (id: string): Promise<ReminderResponse> => {
    const response = await api.get<ReminderResponse>(`/reminders/${id}`)
    return response.data
  },

  // Create reminder
  createReminder: async (
    payload: CreateReminderPayload
  ): Promise<ReminderResponse> => {
    const response = await api.post<ReminderResponse>('/reminders', payload)
    return response.data
  },

  // Update reminder
  updateReminder: async (
    id: string,
    payload: UpdateReminderPayload
  ): Promise<ReminderResponse> => {
    const response = await api.put<ReminderResponse>(
      `/reminders/${id}`,
      payload
    )
    return response.data
  },

  // Soft delete reminder
  deleteReminder: async (id: string): Promise<DeleteResponse> => {
    const response = await api.delete<DeleteResponse>(`/reminders/${id}`)
    return response.data
  },

  // Get deleted reminders
  getDeletedReminders: async (
    params: DeletedRemindersQueryParams
  ): Promise<RemindersResponse> => {
    const response = await api.get<RemindersResponse>(
      '/reminders/deleted/list',
      {
        params: filterParams(params as Record<string, unknown>),
      }
    )
    return response.data
  },

  // Restore reminder
  restoreReminder: async (id: string): Promise<ReminderResponse> => {
    const response = await api.post<ReminderResponse>(
      `/reminders/${id}/restore`
    )
    return response.data
  },

  // Permanently delete reminder
  permanentDeleteReminder: async (id: string): Promise<DeleteResponse> => {
    const response = await api.delete<DeleteResponse>(
      `/reminders/${id}/permanent`
    )
    return response.data
  },
}
