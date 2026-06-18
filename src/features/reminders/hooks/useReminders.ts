import { useQuery } from '@tanstack/react-query'
import { reminderService } from '../services/reminderService'
import type {
  RemindersQueryParams,
  DeletedRemindersQueryParams,
  RemindersResponse,
  ReminderResponse,
} from '../types/reminderType'
import type { AxiosError } from 'axios'

// Query keys factory
export const reminderKeys = {
  all: ['reminders'] as const,
  lists: () => [...reminderKeys.all, 'list'] as const,
  list: (params?: RemindersQueryParams) =>
    [...reminderKeys.lists(), params] as const,
  details: () => [...reminderKeys.all, 'detail'] as const,
  detail: (id: string) => [...reminderKeys.details(), id] as const,
  deleted: () => [...reminderKeys.all, 'deleted'] as const,
  deletedList: (params?: DeletedRemindersQueryParams) =>
    [...reminderKeys.deleted(), params] as const,
}

// Get all reminders
export const useReminders = (params?: RemindersQueryParams) => {
  return useQuery<RemindersResponse, AxiosError<{ message?: string }>>({
    queryKey: reminderKeys.list(params),
    queryFn: () => reminderService.getReminders(params || {}),
    placeholderData: (prev) => prev,
  })
}

// Get reminder by ID
export const useReminder = (id: string | undefined) => {
  return useQuery<ReminderResponse, AxiosError<{ message?: string }>>({
    queryKey: reminderKeys.detail(id || ''),
    queryFn: () => reminderService.getReminderById(id!),
    enabled: !!id,
  })
}

// Get deleted reminders
export const useDeletedReminders = (params?: DeletedRemindersQueryParams) => {
  return useQuery<RemindersResponse, AxiosError<{ message?: string }>>({
    queryKey: reminderKeys.deletedList(params),
    queryFn: () => reminderService.getDeletedReminders(params || {}),
    placeholderData: (prev) => prev,
  })
}
