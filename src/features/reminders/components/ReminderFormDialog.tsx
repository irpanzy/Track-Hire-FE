import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Bell, X, Loader2, Save, Calendar, Link2 } from 'lucide-react'
import { useReminderMutations } from '../hooks/useReminderMutations'
import {
  createReminderSchema,
  type CreateReminderFormValues,
} from '../schemas/reminderSchema'
import type { Reminder } from '../types/reminderType'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

// Helper to convert ISO date to datetime-local format
const toDatetimeLocal = (isoString: string) => {
  if (!isoString) return ''
  const date = new Date(isoString)
  const offset = date.getTimezoneOffset() * 60000
  const localDate = new Date(date.getTime() - offset)
  return localDate.toISOString().slice(0, 16)
}

// Helper to convert datetime-local to ISO string
const toISO = (datetimeLocal: string) => {
  if (!datetimeLocal) return ''
  return new Date(datetimeLocal).toISOString()
}

interface ReminderFormDialogProps {
  reminder: Reminder | null
  applications: { id: string; position: string; company: { name: string } }[]
  onClose: () => void
}

export default function ReminderFormDialog({
  reminder,
  applications,
  onClose,
}: ReminderFormDialogProps) {
  const isEditMode = !!reminder
  const { createReminder, updateReminder } = useReminderMutations()

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateReminderFormValues>({
    resolver: zodResolver(createReminderSchema),
    defaultValues: isEditMode
      ? {
          title: reminder.title,
          description: reminder.description || '',
          reminderDate: toDatetimeLocal(reminder.reminderDate),
          applicationId: reminder.application?.id || '',
        }
      : {
          title: '',
          description: '',
          reminderDate: '',
          applicationId: '',
        },
  })

  const onSubmit = (data: CreateReminderFormValues) => {
    const payload = {
      title: data.title,
      description: data.description || undefined,
      reminderDate: toISO(data.reminderDate),
      applicationId: data.applicationId || undefined,
    }

    if (isEditMode) {
      updateReminder.mutate(
        { id: reminder.id, payload },
        { onSuccess: () => onClose() }
      )
    } else {
      createReminder.mutate(payload, { onSuccess: () => onClose() })
    }
  }

  const isMutating = createReminder.isPending || updateReminder.isPending

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent
        className="max-h-[90vh] w-[98vw] !max-w-none overflow-y-auto sm:w-[90vw] md:w-[80vw] lg:w-[70vw] xl:w-[60vw]"
        showCloseButton={false}
      >
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/10">
                <Bell className="h-4 w-4 text-indigo-400" />
              </div>
              <span>{isEditMode ? 'Edit Reminder' : 'New Reminder'}</span>
            </div>
            <button
              onClick={onClose}
              disabled={isMutating}
              className="rounded-lg p-1 text-zinc-500 transition-colors hover:bg-zinc-800 hover:text-white disabled:cursor-not-allowed"
            >
              <X className="h-5 w-5" />
            </button>
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Title */}
            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs font-semibold text-zinc-400">
                Title <span className="text-red-400">*</span>
              </label>
              <input
                {...register('title')}
                placeholder="e.g. Follow up interview call"
                className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3.5 py-2 text-sm text-white placeholder-zinc-500 transition-all outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
              {errors.title && (
                <p className="text-xs text-red-400">{errors.title.message}</p>
              )}
            </div>

            {/* Reminder Date */}
            <div className="space-y-1.5">
              <label className="flex items-center gap-1.5 text-xs font-semibold text-zinc-400">
                <Calendar className="h-3.5 w-3.5" />
                Reminder Date & Time <span className="text-red-400">*</span>
              </label>
              <input
                {...register('reminderDate')}
                type="datetime-local"
                className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3.5 py-2 text-sm text-white [color-scheme:dark] transition-all outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
              {errors.reminderDate && (
                <p className="text-xs text-red-400">
                  {errors.reminderDate.message}
                </p>
              )}
            </div>

            {/* Link to Application */}
            <div className="space-y-1.5">
              <label className="flex items-center gap-1.5 text-xs font-semibold text-zinc-400">
                <Link2 className="h-3.5 w-3.5" />
                Link to Application (optional)
              </label>
              <Controller
                name="applicationId"
                control={control}
                render={({ field }) => (
                  <Select
                    value={field.value || undefined}
                    onValueChange={(val) =>
                      field.onChange(val === 'none' ? '' : val)
                    }
                  >
                    <SelectTrigger className="h-[38px] w-full border-zinc-800 bg-zinc-950 text-white">
                      <SelectValue placeholder="None — standalone reminder" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">
                        None — standalone reminder
                      </SelectItem>
                      {applications.map((app) => (
                        <SelectItem key={app.id} value={app.id}>
                          {app.position} @ {app.company.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            {/* Description */}
            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs font-semibold text-zinc-400">
                Description
              </label>
              <Textarea
                {...register('description')}
                rows={3}
                placeholder="Additional notes or context..."
                className="resize-y"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 border-t border-zinc-800 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isMutating}
              className="rounded-lg border border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isMutating}
              className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-indigo-500 disabled:cursor-not-allowed disabled:bg-indigo-700"
            >
              {isMutating ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  {isEditMode ? 'Update' : 'Create'} Reminder
                </>
              )}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
