import { Search, SlidersHorizontal } from 'lucide-react'
import {
  APPLICATION_STATUS_OPTIONS,
  APPLICATION_SOURCE_OPTIONS,
  JOB_TYPE_OPTIONS,
} from '../constants/applicationConstants'

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
              <input
                type="text"
                placeholder="Search by position or company..."
                value={searchInput}
                onChange={(e) => onSearchInputChange(e.target.value)}
                onKeyDown={onSearchKeyDown}
                className="w-full rounded-lg border border-zinc-800 bg-zinc-950 py-2 pr-4 pl-10 text-sm text-white placeholder-zinc-500 transition-all outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
            </div>
            <button
              onClick={onSearchSubmit}
              className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-500"
            >
              Search
            </button>
          </div>
        </div>

        {/* Status Filter */}
        <div>
          <select
            value={status}
            onChange={(e) => onStatusChange(e.target.value)}
            className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-white transition-all outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          >
            <option value="">All Statuses</option>
            {APPLICATION_STATUS_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Source Filter */}
        <div>
          <select
            value={source}
            onChange={(e) => onSourceChange(e.target.value)}
            className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-white transition-all outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          >
            <option value="">All Sources</option>
            {APPLICATION_SOURCE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Job Type Filter */}
        <div>
          <select
            value={jobType}
            onChange={(e) => onJobTypeChange(e.target.value)}
            className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-white transition-all outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          >
            <option value="">All Job Types</option>
            {JOB_TYPE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Order */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-zinc-500">Sort Order:</span>
        <button
          onClick={() => onOrderChange(order === 'asc' ? 'desc' : 'asc')}
          className="rounded-lg border border-zinc-800 px-3 py-1 text-xs font-medium text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white"
        >
          {order === 'asc' ? '↑ Oldest First' : '↓ Newest First'}
        </button>
      </div>
    </div>
  )
}
