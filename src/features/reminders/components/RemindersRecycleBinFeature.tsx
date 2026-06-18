import { useState } from 'react'
import { Trash2, RefreshCw, Bell, AlarmClock } from 'lucide-react'
import { useDeletedReminders } from '../hooks/useReminders'
import { useReminderMutations } from '../hooks/useReminderMutations'
import type {
  Reminder,
  DeletedRemindersQueryParams,
} from '../types/reminderType'
import { Button } from '@/components/ui/button'
import ConfirmPermanentDeleteReminderDialog from './ConfirmPermanentDeleteReminderDialog'

const LIMIT = 10

export default function RemindersRecycleBinFeature() {
  const [params, setParams] = useState<DeletedRemindersQueryParams>({
    page: 1,
    limit: LIMIT,
  })
  const [restoreTarget, setRestoreTarget] = useState<Reminder | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<Reminder | null>(null)

  const { data, isLoading, isError } = useDeletedReminders(params)
  const { restoreReminder, permanentDeleteReminder } = useReminderMutations()

  const pagination = data?.pagination
  const reminders = data?.reminders ?? []

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">
            Reminders Recycle Bin
          </h1>
          <p className="mt-0.5 text-sm text-zinc-500">
            Restore or permanently delete reminders
          </p>
        </div>
        {pagination && (
          <div className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2">
            <Trash2 className="h-4 w-4 text-red-400" />
            <span className="text-sm font-semibold text-white">
              {pagination.total}
            </span>
            <span className="text-sm text-zinc-500">deleted</span>
          </div>
        )}
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="flex h-64 items-center justify-center">
          <div className="text-center">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent" />
            <p className="mt-3 text-sm text-zinc-500">
              Loading deleted reminders...
            </p>
          </div>
        </div>
      ) : isError ? (
        <div className="flex h-64 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900">
          <p className="text-sm text-red-400">
            Failed to load deleted reminders
          </p>
        </div>
      ) : reminders.length > 0 ? (
        <>
          <div className="overflow-hidden rounded-xl border border-zinc-800">
            <table className="w-full">
              <thead className="border-b border-zinc-800 bg-zinc-900">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold tracking-wider text-zinc-400 uppercase">
                    Reminder
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold tracking-wider text-zinc-400 uppercase">
                    Reminder Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold tracking-wider text-zinc-400 uppercase">
                    Linked App
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold tracking-wider text-zinc-400 uppercase">
                    Deleted At
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-semibold tracking-wider text-zinc-400 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800 bg-zinc-950">
                {reminders.map((reminder) => (
                  <tr
                    key={reminder.id}
                    className="transition-colors hover:bg-zinc-900/50"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-800">
                          <Bell className="h-4 w-4 text-zinc-500" />
                        </div>
                        <div>
                          <div className="font-medium text-white">
                            {reminder.title}
                          </div>
                          {reminder.description && (
                            <div className="max-w-xs truncate text-sm text-zinc-500">
                              {reminder.description}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-zinc-400">
                      {new Date(reminder.reminderDate).toLocaleString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </td>
                    <td className="px-6 py-4 text-sm text-zinc-400">
                      {reminder.application ? (
                        <div>
                          <div className="font-medium text-zinc-300">
                            {reminder.application.position}
                          </div>
                          <div className="text-xs text-zinc-500">
                            {reminder.application.company.name}
                          </div>
                        </div>
                      ) : (
                        <span className="text-zinc-600">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-zinc-400">
                      {reminder.deletedAt
                        ? new Date(reminder.deletedAt).toLocaleString()
                        : '—'}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setRestoreTarget(reminder)}
                        >
                          <RefreshCw className="mr-1.5 h-3.5 w-3.5" />
                          Restore
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => setDeleteTarget(reminder)}
                        >
                          <Trash2 className="mr-1.5 h-3.5 w-3.5" />
                          Delete Forever
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {pagination && pagination.totalPages > 1 && (
            <div className="flex items-center justify-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setParams((p) => ({ ...p, page: p.page! - 1 }))}
                disabled={params.page === 1}
              >
                Previous
              </Button>
              <span className="text-sm text-zinc-400">
                Page {pagination.page} of {pagination.totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setParams((p) => ({ ...p, page: p.page! + 1 }))}
                disabled={params.page === pagination.totalPages}
              >
                Next
              </Button>
            </div>
          )}
        </>
      ) : (
        <div className="space-y-3 rounded-xl border border-zinc-800 bg-zinc-900 p-12 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-zinc-800">
            <AlarmClock className="h-7 w-7 text-zinc-600" />
          </div>
          <h3 className="text-lg font-bold text-white">No deleted reminders</h3>
          <p className="mx-auto max-w-sm text-sm text-zinc-500">
            Deleted reminders will appear here
          </p>
        </div>
      )}

      {/* Restore confirmation */}
      {restoreTarget && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={() => setRestoreTarget(null)}
        >
          <div
            className="mx-4 w-full max-w-md rounded-xl border border-zinc-800 bg-zinc-900 p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/10">
                <RefreshCw className="h-5 w-5 text-emerald-400" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">
                  Restore Reminder?
                </h2>
                <p className="text-sm text-zinc-500">
                  This reminder will be moved back to your active list
                </p>
              </div>
            </div>
            <div className="mb-6 rounded-lg border border-zinc-800 bg-zinc-950 p-4">
              <p className="text-sm text-zinc-400">
                <span className="font-medium text-white">Reminder:</span>{' '}
                {restoreTarget.title}
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setRestoreTarget(null)}
                disabled={restoreReminder.isPending}
              >
                Cancel
              </Button>
              <Button
                className="flex-1 bg-emerald-600 hover:bg-emerald-500"
                onClick={() => {
                  restoreReminder.mutate(restoreTarget.id)
                  setRestoreTarget(null)
                }}
                disabled={restoreReminder.isPending}
              >
                {restoreReminder.isPending ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Restoring...
                  </>
                ) : (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Restore
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}

      {deleteTarget && (
        <ConfirmPermanentDeleteReminderDialog
          reminder={deleteTarget}
          onConfirm={() => {
            permanentDeleteReminder.mutate(deleteTarget.id)
            setDeleteTarget(null)
          }}
          onCancel={() => setDeleteTarget(null)}
          isLoading={permanentDeleteReminder.isPending}
        />
      )}
    </div>
  )
}
