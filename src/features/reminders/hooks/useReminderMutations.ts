import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { reminderService } from '../services/reminderService'
import { reminderKeys } from './useReminders'
import type {
  CreateReminderPayload,
  UpdateReminderPayload,
  ReminderResponse,
  DeleteResponse,
} from '../types/reminderType'
import type { AxiosError } from 'axios'

export const useReminderMutations = () => {
  const queryClient = useQueryClient()

  // Create reminder
  const createReminder = useMutation<
    ReminderResponse,
    AxiosError<{ message?: string }>,
    CreateReminderPayload
  >({
    mutationFn: (payload) => reminderService.createReminder(payload),
    onSuccess: (data) => {
      toast.success(data.message || 'Reminder created successfully!')
      queryClient.invalidateQueries({ queryKey: reminderKeys.lists() })
    },
    onError: (error) => {
      const message =
        error?.response?.data?.message || 'Failed to create reminder'
      toast.error(message)
    },
  })

  // Update reminder
  const updateReminder = useMutation<
    ReminderResponse,
    AxiosError<{ message?: string }>,
    { id: string; payload: UpdateReminderPayload }
  >({
    mutationFn: ({ id, payload }) =>
      reminderService.updateReminder(id, payload),
    onSuccess: (data, variables) => {
      toast.success(data.message || 'Reminder updated successfully!')
      queryClient.invalidateQueries({
        queryKey: reminderKeys.detail(variables.id),
      })
      queryClient.invalidateQueries({ queryKey: reminderKeys.lists() })
    },
    onError: (error) => {
      const message =
        error?.response?.data?.message || 'Failed to update reminder'
      toast.error(message)
    },
  })

  // Toggle isDone (update with just isDone field)
  const toggleReminderDone = useMutation<
    ReminderResponse,
    AxiosError<{ message?: string }>,
    { id: string; isDone: boolean }
  >({
    mutationFn: ({ id, isDone }) =>
      reminderService.updateReminder(id, { isDone }),
    onSuccess: (data) => {
      toast.success(
        data.reminder.isDone
          ? 'Reminder marked as done!'
          : 'Reminder marked as pending'
      )
      queryClient.invalidateQueries({ queryKey: reminderKeys.lists() })
    },
    onError: (error) => {
      const message =
        error?.response?.data?.message || 'Failed to update reminder'
      toast.error(message)
    },
  })

  // Soft delete reminder
  const deleteReminder = useMutation<
    DeleteResponse,
    AxiosError<{ message?: string }>,
    string
  >({
    mutationFn: (id) => reminderService.deleteReminder(id),
    onSuccess: (data) => {
      toast.success(data.message || 'Reminder deleted successfully!')
      queryClient.invalidateQueries({ queryKey: reminderKeys.lists() })
      queryClient.invalidateQueries({ queryKey: reminderKeys.deleted() })
    },
    onError: (error) => {
      const message =
        error?.response?.data?.message || 'Failed to delete reminder'
      toast.error(message)
    },
  })

  // Restore reminder
  const restoreReminder = useMutation<
    ReminderResponse,
    AxiosError<{ message?: string }>,
    string
  >({
    mutationFn: (id) => reminderService.restoreReminder(id),
    onSuccess: (data) => {
      toast.success(data.message || 'Reminder restored successfully!')
      queryClient.invalidateQueries({ queryKey: reminderKeys.lists() })
      queryClient.invalidateQueries({ queryKey: reminderKeys.deleted() })
    },
    onError: (error) => {
      const message =
        error?.response?.data?.message || 'Failed to restore reminder'
      toast.error(message)
    },
  })

  // Permanently delete reminder
  const permanentDeleteReminder = useMutation<
    DeleteResponse,
    AxiosError<{ message?: string }>,
    string
  >({
    mutationFn: (id) => reminderService.permanentDeleteReminder(id),
    onSuccess: (data) => {
      toast.success(data.message || 'Reminder permanently deleted!')
      queryClient.invalidateQueries({ queryKey: reminderKeys.deleted() })
    },
    onError: (error) => {
      const message =
        error?.response?.data?.message ||
        'Failed to permanently delete reminder'
      toast.error(message)
    },
  })

  return {
    createReminder,
    updateReminder,
    toggleReminderDone,
    deleteReminder,
    restoreReminder,
    permanentDeleteReminder,
  }
}
