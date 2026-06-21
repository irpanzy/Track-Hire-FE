import {
  Loader2,
  AlertTriangle,
  Briefcase,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import type {
  Application,
  ApplicationsQueryParams,
  Pagination,
} from '../types/applicationType'
import ApplicationTableRow from './ApplicationTableRow'

interface ApplicationsTableProps {
  applications: Application[]
  isLoading: boolean
  isError: boolean
  pagination: Pagination | undefined
  sortBy: ApplicationsQueryParams['sortBy']
  order: ApplicationsQueryParams['order']
  onToggleSort: (field: ApplicationsQueryParams['sortBy']) => void
  onViewDetail: (app: Application) => void
  onEdit: (app: Application) => void
  onDelete: (app: Application) => void
  onPageChange: (page: number) => void
}

function SortIndicator({
  field,
  sortBy,
  order,
}: {
  field: ApplicationsQueryParams['sortBy']
  sortBy: ApplicationsQueryParams['sortBy']
  order: ApplicationsQueryParams['order']
}) {
  if (sortBy !== field) return null
  return <span className="text-indigo-400">{order === 'asc' ? '↑' : '↓'}</span>
}

export default function ApplicationsTable({
  applications,
  isLoading,
  isError,
  pagination,
  sortBy,
  order,
  onToggleSort,
  onViewDetail,
  onEdit,
  onDelete,
  onPageChange,
}: ApplicationsTableProps) {
  if (isLoading) {
    return (
      <div className="glass flex h-64 items-center justify-center rounded-xl">
        <Loader2 className="h-6 w-6 animate-spin text-indigo-400" />
      </div>
    )
  }

  if (isError) {
    return (
      <div className="glass flex h-64 flex-col items-center justify-center gap-3 rounded-xl text-zinc-500">
        <AlertTriangle className="h-8 w-8 text-red-400" />
        <p className="text-sm">
          Failed to load applications. Please try again.
        </p>
      </div>
    )
  }

  if (applications.length === 0) {
    return (
      <div className="glass flex h-64 flex-col items-center justify-center gap-3 rounded-xl text-zinc-500">
        <Briefcase className="h-8 w-8" />
        <p className="text-sm">No applications found</p>
        <p className="text-xs">
          Start tracking your job applications by adding one!
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Table */}
      <div className="glass overflow-hidden rounded-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.06] bg-white/[0.02]">
                <th
                  className="cursor-pointer px-4 py-3 text-left font-medium text-zinc-500 transition-colors hover:text-zinc-300"
                  onClick={() => onToggleSort('position')}
                >
                  Position{' '}
                  <SortIndicator
                    field="position"
                    sortBy={sortBy}
                    order={order}
                  />
                </th>
                <th className="hidden px-4 py-3 text-left font-medium text-zinc-500 md:table-cell">
                  Job Type
                </th>
                <th className="hidden px-4 py-3 text-left font-medium text-zinc-500 lg:table-cell">
                  Location
                </th>
                <th
                  className="cursor-pointer px-4 py-3 text-left font-medium text-zinc-500 transition-colors hover:text-zinc-300"
                  onClick={() => onToggleSort('status')}
                >
                  Status{' '}
                  <SortIndicator field="status" sortBy={sortBy} order={order} />
                </th>
                <th
                  className="hidden cursor-pointer px-4 py-3 text-left font-medium text-zinc-500 transition-colors hover:text-zinc-300 sm:table-cell"
                  onClick={() => onToggleSort('appliedDate')}
                >
                  Applied{' '}
                  <SortIndicator
                    field="appliedDate"
                    sortBy={sortBy}
                    order={order}
                  />
                </th>
                <th className="px-4 py-3 text-right font-medium text-zinc-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.05]">
              {applications.map((app) => (
                <ApplicationTableRow
                  key={app.id}
                  application={app}
                  onViewDetail={onViewDetail}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex items-center justify-between text-sm text-zinc-500">
          <span>
            Showing{' '}
            <span className="font-medium text-zinc-300">
              {(pagination.page - 1) * pagination.limit + 1}–
              {Math.min(pagination.page * pagination.limit, pagination.total)}
            </span>{' '}
            of{' '}
            <span className="font-medium text-zinc-300">
              {pagination.total}
            </span>{' '}
            applications
          </span>
          <div className="flex items-center gap-2">
            <button
              disabled={pagination.page <= 1}
              onClick={() => onPageChange(pagination.page - 1)}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-zinc-400 backdrop-blur-md transition-colors hover:bg-white/[0.06] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="font-medium text-zinc-300">
              {pagination.page} / {pagination.totalPages}
            </span>
            <button
              disabled={pagination.page >= pagination.totalPages}
              onClick={() => onPageChange(pagination.page + 1)}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-zinc-400 backdrop-blur-md transition-colors hover:bg-white/[0.06] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
