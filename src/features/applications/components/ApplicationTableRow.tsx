import { Eye, Pencil, Trash2, Building2, MapPin } from 'lucide-react'
import { STATUS_COLORS } from '../constants/applicationConstants'
import type { Application } from '../types/applicationType'
import { cn } from '@/lib/utils'

interface ApplicationTableRowProps {
  application: Application
  onViewDetail: (app: Application) => void
  onEdit: (app: Application) => void
  onDelete: (app: Application) => void
}

export default function ApplicationTableRow({
  application,
  onViewDetail,
  onEdit,
  onDelete,
}: ApplicationTableRowProps) {
  return (
    <tr className="group transition-colors hover:bg-zinc-800/30">
      {/* Company & Position */}
      <td className="px-4 py-3.5">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-zinc-700 bg-zinc-800">
            <Building2 className="h-5 w-5 text-zinc-400" />
          </div>
          <div className="min-w-0 flex-1">
            <p
              className="cursor-pointer truncate font-medium text-white transition-colors hover:text-indigo-400"
              onClick={() => onViewDetail(application)}
            >
              {application.position}
            </p>
            <p className="truncate text-xs text-zinc-500">
              {application.company.name}
            </p>
          </div>
        </div>
      </td>

      {/* Job Type */}
      <td className="hidden px-4 py-3.5 md:table-cell">
        <span className="inline-flex items-center rounded-full bg-zinc-800 px-2.5 py-1 text-xs font-medium text-zinc-400 ring-1 ring-zinc-700/50">
          {application.jobType.replace('_', ' ')}
        </span>
      </td>

      {/* Location */}
      <td className="hidden px-4 py-3.5 lg:table-cell">
        <div className="flex items-center gap-1.5 text-zinc-500">
          <MapPin className="h-3.5 w-3.5" />
          <span className="text-sm">
            {application.location || application.company.location || 'N/A'}
          </span>
        </div>
      </td>

      {/* Status */}
      <td className="px-4 py-3.5">
        <span
          className={cn(
            'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1',
            STATUS_COLORS[application.status]
          )}
        >
          {application.status}
        </span>
      </td>

      {/* Applied Date */}
      <td className="hidden px-4 py-3.5 text-zinc-500 sm:table-cell">
        {new Date(application.appliedDate).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })}
      </td>

      {/* Actions */}
      <td className="px-4 py-3.5 text-right">
        <div className="flex items-center justify-end gap-1">
          <button
            onClick={() => onViewDetail(application)}
            title="View details"
            className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-zinc-500 transition-colors hover:bg-indigo-500/10 hover:text-indigo-400"
          >
            <Eye className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">View</span>
          </button>
          <button
            onClick={() => onEdit(application)}
            title="Edit application"
            className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-zinc-500 transition-colors hover:bg-yellow-500/10 hover:text-yellow-400"
          >
            <Pencil className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Edit</span>
          </button>
          <button
            onClick={() => onDelete(application)}
            title="Delete application"
            className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-zinc-500 transition-colors hover:bg-red-500/10 hover:text-red-400"
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Delete</span>
          </button>
        </div>
      </td>
    </tr>
  )
}
