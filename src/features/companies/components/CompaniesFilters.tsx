import { Search, SlidersHorizontal } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

interface CompaniesFiltersProps {
  searchInput: string
  userOnly: boolean
  order: 'asc' | 'desc' | undefined
  onSearchInputChange: (value: string) => void
  onSearchSubmit: () => void
  onSearchKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void
  onUserOnlyChange: (userOnly: boolean) => void
  onOrderChange: (order: 'asc' | 'desc') => void
}

export default function CompaniesFilters({
  searchInput,
  userOnly,
  order,
  onSearchInputChange,
  onSearchSubmit,
  onSearchKeyDown,
  onUserOnlyChange,
  onOrderChange,
}: CompaniesFiltersProps) {
  return (
    <div className="space-y-4 rounded-xl border border-zinc-800 bg-zinc-900 p-4">
      <div className="flex items-center gap-2 text-zinc-400">
        <SlidersHorizontal className="h-4 w-4" />
        <span className="text-sm font-medium">Filters</span>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-12">
        {/* Search */}
        <div className="md:col-span-8">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-zinc-500" />
              <Input
                type="text"
                placeholder="Search by company name..."
                value={searchInput}
                onChange={(e) => onSearchInputChange(e.target.value)}
                onKeyDown={onSearchKeyDown}
                className="pl-10"
              />
            </div>
            <Button onClick={onSearchSubmit}>Search</Button>
          </div>
        </div>

        {/* User Only Filter */}
        <div className="flex items-center gap-2 md:col-span-4">
          <input
            id="userOnly"
            type="checkbox"
            checked={userOnly}
            onChange={(e) => onUserOnlyChange(e.target.checked)}
            className="h-4 w-4 cursor-pointer rounded border-zinc-700 bg-zinc-900 text-indigo-600 transition-colors focus:ring-2 focus:ring-indigo-500/20 focus:ring-offset-0"
          />
          <Label
            htmlFor="userOnly"
            className="cursor-pointer text-sm font-normal text-zinc-400"
          >
            Show only companies with my applications
          </Label>
        </div>
      </div>

      {/* Order */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-zinc-500">Sort Order:</span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onOrderChange(order === 'asc' ? 'desc' : 'asc')}
        >
          {order === 'asc' ? '↑ A-Z' : '↓ Z-A'}
        </Button>
      </div>
    </div>
  )
}
