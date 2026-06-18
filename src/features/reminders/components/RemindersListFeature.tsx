import { useState } from 'react'
import {
  Bell,
  Calendar,
  Clock,
  Trash2,
  CheckCircle2,
  Plus,
  Archive,
  Edit2,
  Building2,
  AlarmClock,
  SlidersHorizontal,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { useReminders } from '../hooks/useReminders'
import { useReminderMutations } from '../hooks/useReminderMutations'
import type { Reminder, RemindersQueryParams } from '../types/reminderType'
import ReminderFormDialog from './ReminderFormDialog'
import ConfirmDeleteReminderDialog from './ConfirmDeleteReminderDialog'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const LIMIT = 20

const formatReminderDate = (dateStr: string) => {
  const date = new Date(dateStr)
  return {
    date: date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }),
    time: date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    }),
  }
}

const isOverdue = (dateStr: string, isDone: boolean) => {
  if (isDone) return false
  return new Date(dateStr) < new Date()
}

interface RemindersListFeatureProps {
  applications: { id: string; position: string; company: { name: string } }[]
}

export default function RemindersListFeature({
  applications,
}: RemindersListFeatureProps) {
  const [params, setParams] = useState<RemindersQueryParams>({
    page: 1,
    limit: LIMIT,
    sortBy: 'reminderDate',
    order: 'asc',
  })
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [selectedReminder, setSelectedReminder] = useState<Reminder | null>(
    null
  )
  const [deleteTarget, setDeleteTarget] = useState<Reminder | null>(null)
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'done'>(
    'all'
  )

  const queryParams: RemindersQueryParams = {
    ...params,
    ...(filterStatus === 'pending' ? { isDone: false } : {}),
    ...(filterStatus === 'done' ? { isDone: true } : {}),
  }

  const { data, isLoading, isError } = useReminders(queryParams)
  const { toggleReminderDone, deleteReminder } = useReminderMutations()

  const handleEdit = (reminder: Reminder) => {
    setSelectedReminder(reminder)
    setIsFormOpen(true)
  }

  const handleCloseForm = () => {
    setIsFormOpen(false)
    setSelectedReminder(null)
  }

  const pagination = data?.pagination
  const reminders = data?.reminders ?? []

  const pendingReminders = reminders.filter((r) => !r.isDone)
  const doneReminders = reminders.filter((r) => r.isDone)

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Reminders</h1>
          <p className="mt-0.5 text-sm text-zinc-500">
            Set and manage deadlines or interview follow-ups
          </p>
        </div>
        <div className="flex items-center gap-3">
          {pagination && (
            <div className="hidden items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2 sm:flex">
              <AlarmClock className="h-4 w-4 text-indigo-400" />
              <span className="text-sm font-semibold text-white">
                {pagination.total}
              </span>
              <span className="text-sm text-zinc-500">reminders</span>
            </div>
          )}
          <Link to="/reminders/recycle-bin">
            <button className="flex cursor-pointer items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-zinc-800 active:scale-95">
              <Archive className="h-4 w-4" />
              <span className="hidden sm:inline">Recycle Bin</span>
              <span className="sm:hidden">Bin</span>
            </button>
          </Link>
          <button
            onClick={() => setIsFormOpen(true)}
            className="flex cursor-pointer items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition-all hover:bg-indigo-500 active:scale-95"
          >
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Add Reminder</span>
            <span className="sm:hidden">Add</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-900 p-4">
        <div className="flex items-center gap-2 text-xs font-semibold text-zinc-400">
          <SlidersHorizontal className="h-3.5 w-3.5" />
          Filter
        </div>
        <div className="flex flex-wrap gap-2">
          {(['all', 'pending', 'done'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`rounded-md px-3 py-1 text-xs font-semibold capitalize transition-colors ${
                filterStatus === status
                  ? 'bg-indigo-600 text-white'
                  : 'border border-zinc-700 text-zinc-400 hover:bg-zinc-800 hover:text-white'
              }`}
            >
              {status === 'all'
                ? 'All'
                : status === 'pending'
                  ? 'Upcoming'
                  : 'Done'}
            </button>
          ))}
        </div>
        <div className="ml-auto flex items-center gap-2">
          <span className="text-xs text-zinc-500">Sort by</span>
          <Select
            value={params.sortBy}
            onValueChange={(v) =>
              setParams((p) => ({
                ...p,
                sortBy: v as RemindersQueryParams['sortBy'],
                page: 1,
              }))
            }
          >
            <SelectTrigger className="h-8 w-[140px] border-zinc-700 bg-zinc-950 text-xs text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="reminderDate">Reminder Date</SelectItem>
              <SelectItem value="createdAt">Created At</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={params.order}
            onValueChange={(v) =>
              setParams((p) => ({
                ...p,
                order: v as 'asc' | 'desc',
                page: 1,
              }))
            }
          >
            <SelectTrigger className="h-8 w-[90px] border-zinc-700 bg-zinc-950 text-xs text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asc">Asc</SelectItem>
              <SelectItem value="desc">Desc</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="flex h-64 items-center justify-center">
          <div className="text-center">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent" />
            <p className="mt-3 text-sm text-zinc-500">Loading reminders...</p>
          </div>
        </div>
      ) : isError ? (
        <div className="flex h-64 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900">
          <p className="text-sm text-red-400">Failed to load reminders</p>
        </div>
      ) : reminders.length === 0 ? (
        <div className="space-y-3 rounded-xl border border-zinc-800 bg-zinc-900 p-12 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-indigo-500/10">
            <Bell className="h-7 w-7 text-indigo-400" />
          </div>
          <h3 className="text-lg font-bold text-white">No reminders found</h3>
          <p className="mx-auto max-w-sm text-sm text-zinc-500">
            {filterStatus !== 'all'
              ? 'Try changing your filter'
              : 'Create your first reminder to stay on top of your job hunt'}
          </p>
          {filterStatus === 'all' && (
            <button
              onClick={() => setIsFormOpen(true)}
              className="mx-auto mt-2 flex cursor-pointer items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-indigo-500"
            >
              <Plus className="h-4 w-4" />
              Add Reminder
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-8">
          {/* Upcoming / Pending */}
          {(filterStatus === 'all' || filterStatus === 'pending') &&
            pendingReminders.length > 0 && (
              <div className="space-y-3">
                <h2 className="flex items-center gap-2 text-sm font-semibold text-zinc-400">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-indigo-500" />
                  Upcoming ({pendingReminders.length})
                </h2>
                <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900">
                  <div className="divide-y divide-zinc-800">
                    {pendingReminders.map((reminder) => {
                      const { date, time } = formatReminderDate(
                        reminder.reminderDate
                      )
                      const overdue = isOverdue(
                        reminder.reminderDate,
                        reminder.isDone
                      )

                      return (
                        <div
                          key={reminder.id}
                          className="group flex flex-col justify-between gap-4 p-5 transition-colors hover:bg-zinc-800/30 sm:flex-row sm:items-center"
                        >
                          <div className="flex items-start gap-3.5">
                            <div
                              className={`mt-0.5 rounded-lg p-2 transition-transform group-hover:scale-105 ${
                                overdue
                                  ? 'bg-red-500/10 text-red-400'
                                  : 'bg-indigo-500/10 text-indigo-400'
                              }`}
                            >
                              <Bell className="h-5 w-5" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <h3 className="text-base font-semibold text-white">
                                {reminder.title}
                              </h3>
                              {reminder.description && (
                                <p className="mt-0.5 truncate text-sm text-zinc-500">
                                  {reminder.description}
                                </p>
                              )}
                              <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-zinc-400">
                                {reminder.application && (
                                  <span className="flex items-center gap-1 font-medium text-zinc-400">
                                    <Building2 className="h-3.5 w-3.5 text-zinc-500" />
                                    {reminder.application.position} @{' '}
                                    {reminder.application.company.name}
                                  </span>
                                )}
                                <span className="flex items-center gap-1">
                                  <Calendar className="h-3.5 w-3.5 text-zinc-500" />
                                  {date}
                                </span>
                                <span
                                  className={`flex items-center gap-1 ${overdue ? 'font-semibold text-red-400' : ''}`}
                                >
                                  <Clock className="h-3.5 w-3.5" />
                                  {time}
                                  {overdue && ' · Overdue'}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 self-end sm:self-center">
                            <button
                              onClick={() =>
                                toggleReminderDone.mutate({
                                  id: reminder.id,
                                  isDone: true,
                                })
                              }
                              disabled={toggleReminderDone.isPending}
                              className="flex cursor-pointer items-center gap-1 rounded-md border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-400 transition-all hover:bg-emerald-500/20 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              <CheckCircle2 className="h-3.5 w-3.5" />
                              Done
                            </button>
                            <button
                              onClick={() => handleEdit(reminder)}
                              className="cursor-pointer rounded-md p-1.5 text-zinc-500 transition-colors hover:bg-zinc-700 hover:text-white"
                            >
                              <Edit2 className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => setDeleteTarget(reminder)}
                              className="cursor-pointer rounded-md p-1.5 text-zinc-500 transition-colors hover:bg-red-500/10 hover:text-red-400"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            )}

          {/* Done */}
          {(filterStatus === 'all' || filterStatus === 'done') &&
            doneReminders.length > 0 && (
              <div className="space-y-3">
                <h2 className="flex items-center gap-2 text-sm font-semibold text-zinc-500">
                  <span className="h-2 w-2 rounded-full bg-zinc-600" />
                  Completed ({doneReminders.length})
                </h2>
                <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 opacity-70">
                  <div className="divide-y divide-zinc-800">
                    {doneReminders.map((reminder) => {
                      const { date, time } = formatReminderDate(
                        reminder.reminderDate
                      )
                      return (
                        <div
                          key={reminder.id}
                          className="flex flex-col justify-between gap-4 p-4 transition-colors hover:bg-zinc-800/20 sm:flex-row sm:items-center"
                        >
                          <div className="flex items-start gap-3.5">
                            <div className="mt-0.5 rounded-lg bg-zinc-950 p-2 text-zinc-600">
                              <CheckCircle2 className="h-5 w-5 text-emerald-500/60" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <h3 className="text-base font-medium text-zinc-500 line-through">
                                {reminder.title}
                              </h3>
                              <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-zinc-600">
                                {reminder.application && (
                                  <span className="flex items-center gap-1">
                                    <Building2 className="h-3.5 w-3.5" />
                                    {reminder.application.position} @{' '}
                                    {reminder.application.company.name}
                                  </span>
                                )}
                                <span className="flex items-center gap-1">
                                  <Calendar className="h-3.5 w-3.5" />
                                  {date}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="h-3.5 w-3.5" />
                                  {time}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 self-end sm:self-center">
                            <button
                              onClick={() =>
                                toggleReminderDone.mutate({
                                  id: reminder.id,
                                  isDone: false,
                                })
                              }
                              disabled={toggleReminderDone.isPending}
                              className="cursor-pointer px-3 py-1.5 text-xs font-medium text-zinc-500 transition-colors hover:text-indigo-400 disabled:cursor-not-allowed"
                            >
                              Undo
                            </button>
                            <button
                              onClick={() => setDeleteTarget(reminder)}
                              className="cursor-pointer rounded-md p-1.5 text-zinc-600 transition-colors hover:bg-red-500/10 hover:text-red-400"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            )}
        </div>
      )}

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

      {/* Dialogs */}
      {isFormOpen && (
        <ReminderFormDialog
          reminder={selectedReminder}
          applications={applications}
          onClose={handleCloseForm}
        />
      )}

      {deleteTarget && (
        <ConfirmDeleteReminderDialog
          reminder={deleteTarget}
          onConfirm={() => {
            deleteReminder.mutate(deleteTarget.id)
            setDeleteTarget(null)
          }}
          onCancel={() => setDeleteTarget(null)}
          isLoading={deleteReminder.isPending}
        />
      )}
    </div>
  )
}
