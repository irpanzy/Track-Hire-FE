import { Loader2, AlertTriangle, Users } from 'lucide-react'
import {
  Shield,
  User as UserIcon,
  CheckCircle,
  XCircle,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import type {
  AdminUser,
  UsersQueryParams,
  Pagination,
} from '../types/adminType'

interface UsersTableProps {
  users: AdminUser[]
  isLoading: boolean
  isError: boolean
  pagination: Pagination | undefined
  sortBy: UsersQueryParams['sortBy']
  order: UsersQueryParams['order']
  onToggleSort: (field: UsersQueryParams['sortBy']) => void
  onDeleteClick: (user: AdminUser) => void
  onPageChange: (page: number) => void
}

function SortIndicator({
  field,
  sortBy,
  order,
}: {
  field: UsersQueryParams['sortBy']
  sortBy: UsersQueryParams['sortBy']
  order: UsersQueryParams['order']
}) {
  if (sortBy !== field) return null
  return <span className="text-indigo-400">{order === 'asc' ? '↑' : '↓'}</span>
}

export default function UsersTable({
  users,
  isLoading,
  isError,
  pagination,
  sortBy,
  order,
  onToggleSort,
  onDeleteClick,
  onPageChange,
}: UsersTableProps) {
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
        <p className="text-sm">Failed to load users. Please try again.</p>
      </div>
    )
  }

  if (users.length === 0) {
    return (
      <div className="glass flex h-64 flex-col items-center justify-center gap-3 rounded-xl text-zinc-500">
        <Users className="h-8 w-8" />
        <p className="text-sm">No users found</p>
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
                <th className="px-4 py-3 text-left font-medium text-zinc-500">
                  User
                </th>
                <th
                  className="hidden cursor-pointer px-4 py-3 text-left font-medium text-zinc-500 transition-colors hover:text-zinc-300 md:table-cell"
                  onClick={() => onToggleSort('email')}
                >
                  Email{' '}
                  <SortIndicator field="email" sortBy={sortBy} order={order} />
                </th>
                <th className="px-4 py-3 text-left font-medium text-zinc-500">
                  Role
                </th>
                <th className="hidden px-4 py-3 text-left font-medium text-zinc-500 sm:table-cell">
                  Verified
                </th>
                <th
                  className="hidden cursor-pointer px-4 py-3 text-left font-medium text-zinc-500 transition-colors hover:text-zinc-300 lg:table-cell"
                  onClick={() => onToggleSort('createdAt')}
                >
                  Joined{' '}
                  <SortIndicator
                    field="createdAt"
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
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="group transition-colors hover:bg-zinc-800/30"
                >
                  {/* User cell */}
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/[0.08] bg-white/[0.04]">
                        {user.avatarUrl ? (
                          <img
                            src={user.avatarUrl}
                            alt={user.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <span className="text-sm font-bold text-zinc-400">
                            {user.name?.[0]?.toUpperCase() || '?'}
                          </span>
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="truncate font-medium text-white">
                          {user.name}
                        </p>
                        <p className="truncate text-xs text-zinc-500">
                          @{user.username}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Email */}
                  <td className="hidden px-4 py-3.5 md:table-cell">
                    <span className="truncate text-zinc-400">{user.email}</span>
                  </td>

                  {/* Role badge */}
                  <td className="px-4 py-3.5">
                    <span
                      className={cn(
                        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold',
                        user.role === 'ADMIN'
                          ? 'bg-indigo-500/15 text-indigo-300 ring-1 ring-indigo-500/30'
                          : 'bg-white/[0.04] text-zinc-400 ring-1 ring-white/[0.08]'
                      )}
                    >
                      {user.role === 'ADMIN' ? (
                        <Shield className="h-3 w-3" />
                      ) : (
                        <UserIcon className="h-3 w-3" />
                      )}
                      {user.role}
                    </span>
                  </td>

                  {/* Verified */}
                  <td className="hidden px-4 py-3.5 sm:table-cell">
                    {user.isEmailVerified ? (
                      <CheckCircle className="h-4 w-4 text-emerald-400" />
                    ) : (
                      <XCircle className="h-4 w-4 text-zinc-600" />
                    )}
                  </td>

                  {/* Joined date */}
                  <td className="hidden px-4 py-3.5 text-zinc-500 lg:table-cell">
                    {new Date(user.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-3.5 text-right">
                    <button
                      onClick={() => onDeleteClick(user)}
                      title="Delete user"
                      className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-zinc-500 transition-colors hover:bg-red-500/10 hover:text-red-400"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      <span className="hidden sm:inline">Delete</span>
                    </button>
                  </td>
                </tr>
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
            users
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
