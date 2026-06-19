import { useState, useCallback } from 'react'
import { Archive } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useUsers, useDeleteUser } from '../hooks/useAdminQueries'
import type { UsersQueryParams, AdminUser } from '../types/adminType'
import UsersFilters from './UsersFilters'
import UsersTable from './UsersTable'
import ConfirmDeleteDialog from './ConfirmDeleteDialog'
import { RetroWindow, RetroButton } from '@/components/ui/retro-window'
import retroProfileIcon from '@/assets/retro-profile.png'

const LIMIT = 10

export default function AdminUsersFeature() {
  const [params, setParams] = useState<UsersQueryParams>({
    page: 1,
    limit: LIMIT,
    sortBy: 'createdAt',
    order: 'desc',
  })
  const [searchInput, setSearchInput] = useState('')
  const [deleteTarget, setDeleteTarget] = useState<AdminUser | null>(null)

  const { data, isLoading, isError } = useUsers(params)
  const deleteMutation = useDeleteUser(() => setDeleteTarget(null))

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
        title="User Management"
        icon={
          <img
            src={retroProfileIcon}
            alt="Users"
            className="mt-1 h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7"
          />
        }
        count={pagination?.total}
        actions={
          <Link to="/admin/recycle-bin">
            <RetroButton
              variant="secondary"
              icon={<Archive className="h-4 w-4" />}
            >
              <span className="hidden sm:inline">Recycle Bin</span>
              <span className="sm:hidden">Bin</span>
            </RetroButton>
          </Link>
        }
      >
        <p className="font-mono text-xs text-zinc-500">
          Manage all registered users in the system
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

      <UsersTable
        users={users}
        isLoading={isLoading}
        isError={isError}
        pagination={pagination}
        sortBy={params.sortBy}
        order={params.order}
        onToggleSort={handleToggleSort}
        onDeleteClick={setDeleteTarget}
        onPageChange={(page) => setParams((p) => ({ ...p, page }))}
      />

      {deleteTarget && (
        <ConfirmDeleteDialog
          user={deleteTarget}
          onConfirm={() => deleteMutation.mutate(deleteTarget.id)}
          onCancel={() => setDeleteTarget(null)}
          isLoading={deleteMutation.isPending}
        />
      )}
    </div>
  )
}
