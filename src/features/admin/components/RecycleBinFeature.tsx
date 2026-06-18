import { useState, useCallback } from 'react'
import { Trash2 } from 'lucide-react'
import {
  useDeletedUsers,
  useRestoreUser,
  usePermanentDeleteUser,
} from '../hooks/useAdminQueries'
import type { UsersQueryParams, DeletedUser } from '../types/adminType'
import UsersFilters from './UsersFilters'
import DeletedUsersTable from './DeletedUsersTable'
import ConfirmRestoreDialog from './ConfirmRestoreDialog'
import ConfirmPermanentDeleteDialog from './ConfirmPermanentDeleteDialog'

const LIMIT = 10

export default function RecycleBinFeature() {
  const [params, setParams] = useState<UsersQueryParams>({
    page: 1,
    limit: LIMIT,
    sortBy: 'createdAt',
    order: 'desc',
  })
  const [searchInput, setSearchInput] = useState('')
  const [restoreTarget, setRestoreTarget] = useState<DeletedUser | null>(null)
  const [permanentDeleteTarget, setPermanentDeleteTarget] =
    useState<DeletedUser | null>(null)

  const { data, isLoading, isError } = useDeletedUsers(params)
  const restoreMutation = useRestoreUser(() => setRestoreTarget(null))
  const permanentDeleteMutation = usePermanentDeleteUser(() =>
    setPermanentDeleteTarget(null)
  )

  const updateParam = useCallback(
    <K extends keyof UsersQueryParams>(key: K, value: UsersQueryParams[K]) => {
      setParams((prev) => ({ ...prev, [key]: value, page: 1 }))
    },
    []
  )

  const handleSearchSubmit = () => {
    if (searchInput.trim()) {
      updateParam('search', searchInput.trim())
    } else {
      // Remove search param if empty
      setParams((prev) => {
        const newParams = { ...prev, page: 1 }
        delete newParams.search
        return newParams
      })
    }
  }

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSearchSubmit()
  }

  const handleToggleSort = (field: UsersQueryParams['sortBy']) => {
    setParams((prev) => ({
      ...prev,
      sortBy: field,
      order: prev.sortBy === field && prev.order === 'asc' ? 'desc' : 'asc',
      page: 1,
    }))
  }

  const pagination = data?.pagination
  const users = data?.users ?? []

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Recycle Bin</h1>
          <p className="mt-0.5 text-sm text-zinc-500">
            Restore or permanently delete users
          </p>
        </div>
        {pagination && (
          <div className="hidden items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2 sm:flex">
            <Trash2 className="h-4 w-4 text-red-400" />
            <span className="text-sm font-semibold text-white">
              {pagination.total}
            </span>
            <span className="text-sm text-zinc-500">deleted users</span>
          </div>
        )}
      </div>

      <UsersFilters
        searchInput={searchInput}
        role={params.role || ''}
        order={params.order}
        onSearchInputChange={setSearchInput}
        onSearchSubmit={handleSearchSubmit}
        onSearchKeyDown={handleSearchKeyDown}
        onRoleChange={(role) => {
          if (role) {
            updateParam('role', role as 'USER' | 'ADMIN')
          } else {
            // Remove role param if empty
            setParams((prev) => {
              const newParams = { ...prev, page: 1 }
              delete newParams.role
              return newParams
            })
          }
        }}
        onOrderChange={(order) => setParams((p) => ({ ...p, order, page: 1 }))}
      />

      <DeletedUsersTable
        users={users}
        isLoading={isLoading}
        isError={isError}
        pagination={pagination}
        sortBy={params.sortBy}
        order={params.order}
        onToggleSort={handleToggleSort}
        onRestoreClick={setRestoreTarget}
        onPermanentDeleteClick={setPermanentDeleteTarget}
        onPageChange={(page) => setParams((p) => ({ ...p, page }))}
      />

      {restoreTarget && (
        <ConfirmRestoreDialog
          user={restoreTarget}
          onConfirm={() => restoreMutation.mutate(restoreTarget.id)}
          onCancel={() => setRestoreTarget(null)}
          isLoading={restoreMutation.isPending}
        />
      )}

      {permanentDeleteTarget && (
        <ConfirmPermanentDeleteDialog
          user={permanentDeleteTarget}
          onConfirm={() =>
            permanentDeleteMutation.mutate(permanentDeleteTarget.id)
          }
          onCancel={() => setPermanentDeleteTarget(null)}
          isLoading={permanentDeleteMutation.isPending}
        />
      )}
    </div>
  )
}
