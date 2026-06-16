import { Search } from 'lucide-react'
import type { UsersQueryParams } from '../types/adminType'

interface UsersFiltersProps {
  searchInput: string
  role: UsersQueryParams['role']
  order: UsersQueryParams['order']
  onSearchInputChange: (value: string) => void
  onSearchSubmit: () => void
  onSearchKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void
  onRoleChange: (role: UsersQueryParams['role']) => void
  onOrderChange: (order: 'asc' | 'desc') => void
}

export default function UsersFilters({
  searchInput,
  role,
  order,
  onSearchInputChange,
  onSearchSubmit,
  onSearchKeyDown,
  onRoleChange,
  onOrderChange,
}: UsersFiltersProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      {/* Search */}
      <div className="relative flex-1">
        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-zinc-500" />
        <input
          type="text"
          placeholder="Search by name, username, or email…"
          value={searchInput}
          onChange={(e) => onSearchInputChange(e.target.value)}
          onKeyDown={onSearchKeyDown}
          className="h-10 w-full rounded-lg border border-zinc-700/60 bg-zinc-900/80 pr-4 pl-9 text-sm text-white placeholder:text-zinc-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 focus:outline-none"
        />
      </div>
      <button
        onClick={onSearchSubmit}
        className="h-10 rounded-lg bg-indigo-600 px-4 text-sm font-semibold text-white transition-colors hover:bg-indigo-500"
      >
        Search
      </button>

      {/* Role Filter */}
      <select
        value={role}
        onChange={(e) =>
          onRoleChange(e.target.value as UsersQueryParams['role'])
        }
        className="h-10 rounded-lg border border-zinc-700/60 bg-zinc-900/80 px-3 text-sm text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 focus:outline-none"
      >
        <option value="">All Roles</option>
        <option value="USER">User</option>
        <option value="ADMIN">Admin</option>
      </select>

      {/* Order */}
      <select
        value={order}
        onChange={(e) => onOrderChange(e.target.value as 'asc' | 'desc')}
        className="h-10 rounded-lg border border-zinc-700/60 bg-zinc-900/80 px-3 text-sm text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 focus:outline-none"
      >
        <option value="desc">Newest First</option>
        <option value="asc">Oldest First</option>
      </select>
    </div>
  )
}
