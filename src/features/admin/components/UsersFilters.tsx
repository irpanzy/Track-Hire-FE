import { Search } from 'lucide-react'
import type { UsersQueryParams } from '../types/adminType'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'

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
        <Input
          type="text"
          placeholder="Search by name, username, or email…"
          value={searchInput}
          onChange={(e) => onSearchInputChange(e.target.value)}
          onKeyDown={onSearchKeyDown}
          className="h-10 pl-9"
        />
      </div>
      <Button onClick={onSearchSubmit} className="h-10">
        Search
      </Button>

      {/* Role Filter */}
      <Select
        value={role || undefined}
        onValueChange={(val) =>
          onRoleChange((val === 'all' ? '' : val) as UsersQueryParams['role'])
        }
      >
        <SelectTrigger className="h-10 w-full border-zinc-700/60 bg-zinc-900/80 text-white sm:w-[150px]">
          <SelectValue placeholder="All Roles" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Roles</SelectItem>
          <SelectItem value="USER">User</SelectItem>
          <SelectItem value="ADMIN">Admin</SelectItem>
        </SelectContent>
      </Select>

      {/* Order */}
      <Select
        value={order}
        onValueChange={(val) => onOrderChange(val as 'asc' | 'desc')}
      >
        <SelectTrigger className="h-10 w-full border-zinc-700/60 bg-zinc-900/80 text-white sm:w-[160px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="desc">Newest First</SelectItem>
          <SelectItem value="asc">Oldest First</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
