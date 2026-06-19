import { useState, useCallback } from 'react'
import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
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
import { RetroWindow, RetroButton } from '@/components/ui/retro-window'
import retroProfileIcon from '@/assets/retro-profile.png'

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
      {/* Retro Window Header */}
      <RetroWindow
        title="Users Recycle Bin"
        icon={
          <img
            src={retroProfileIcon}
            alt="Recycle Bin"
            className="mt-1 h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7"
          />
        }
        count={pagination?.total}
        actions={
          <Link to="/admin/users">
            <RetroButton
              variant="secondary"
              icon={<ArrowLeft className="h-4 w-4" />}
            >
              <span className="hidden sm:inline">Back to Users</span>
              <span className="sm:hidden">Back</span>
            </RetroButton>
          </Link>
        }
      >
        <p className="font-mono text-xs text-zinc-500">
          Restore or permanently delete users
        </p>
      </RetroWindow>

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
