import { Search, SlidersHorizontal } from 'lucide-react'
import {
  APPLICATION_STATUS_OPTIONS,
  APPLICATION_SOURCE_OPTIONS,
  JOB_TYPE_OPTIONS,
} from '../constants/applicationConstants'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'

interface ApplicationsFiltersProps {
  searchInput: string
  status: string
  source: string
  jobType: string
  order: 'asc' | 'desc' | undefined
  onSearchInputChange: (value: string) => void
  onSearchSubmit: () => void
  onSearchKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void
  onStatusChange: (status: string) => void
  onSourceChange: (source: string) => void
  onJobTypeChange: (jobType: string) => void
  onOrderChange: (order: 'asc' | 'desc') => void
}

export default function ApplicationsFilters({
  searchInput,
  status,
  source,
  jobType,
  order,
  onSearchInputChange,
  onSearchSubmit,
  onSearchKeyDown,
  onStatusChange,
  onSourceChange,
  onJobTypeChange,
  onOrderChange,
}: ApplicationsFiltersProps) {
  return (
    <div className="space-y-4 rounded-xl border border-zinc-800 bg-zinc-900 p-4">
      <div className="flex items-center gap-2 text-zinc-400">
        <SlidersHorizontal className="h-4 w-4" />
        <span className="text-sm font-medium">Filters</span>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-5">
        {/* Search */}
        <div className="lg:col-span-2">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-zinc-500" />
              <Input
                type="text"
                placeholder="Search by position or company..."
                value={searchInput}
                onChange={(e) => onSearchInputChange(e.target.value)}
                onKeyDown={onSearchKeyDown}
                className="pl-10"
              />
            </div>
            <Button onClick={onSearchSubmit}>Search</Button>
          </div>
        </div>

        {/* Status Filter */}
        <div>
          <Select 
            value={status || undefined} 
            onValueChange={(val) => onStatusChange(val === "all" ? "" : val)}
          >
            <SelectTrigger className="h-[38px] w-full border-zinc-800 bg-zinc-950 text-white">
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              {APPLICATION_STATUS_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Source Filter */}
        <div>
          <Select 
            value={source || undefined} 
            onValueChange={(val) => onSourceChange(val === "all" ? "" : val)}
          >
            <SelectTrigger className="h-[38px] w-full border-zinc-800 bg-zinc-950 text-white">
              <SelectValue placeholder="All Sources" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sources</SelectItem>
              {APPLICATION_SOURCE_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Job Type Filter */}
        <div>
          <Select 
            value={jobType || undefined} 
            onValueChange={(val) => onJobTypeChange(val === "all" ? "" : val)}
          >
            <SelectTrigger className="h-[38px] w-full border-zinc-800 bg-zinc-950 text-white">
              <SelectValue placeholder="All Job Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Job Types</SelectItem>
              {JOB_TYPE_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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
          {order === 'asc' ? '↑ Oldest First' : '↓ Newest First'}
        </Button>
      </div>
    </div>
  )
}
