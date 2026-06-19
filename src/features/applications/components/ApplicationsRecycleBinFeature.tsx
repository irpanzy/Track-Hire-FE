import { useState } from 'react'
import { Trash2, RefreshCw, Search, Briefcase, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useDeletedApplications } from '../hooks/useApplications'
import { useApplicationMutations } from '../hooks/useApplicationMutations'
import type {
  Application,
  ApplicationsQueryParams,
} from '../types/applicationType'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { STATUS_COLORS, STATUS_LABELS } from '../constants/applicationConstants'
import ConfirmRestoreDialog from './ConfirmRestoreDialog'
import ConfirmPermanentDeleteDialog from './ConfirmPermanentDeleteDialog'
import { RetroWindow, RetroButton } from '@/components/ui/retro-window'
import retroFolderIcon from '@/assets/retro-folder.png'

const LIMIT = 10

export default function ApplicationsRecycleBinFeature() {
  const [params, setParams] = useState<ApplicationsQueryParams>({
    page: 1,
    limit: LIMIT,
    sortBy: 'appliedDate',
    order: 'desc',
  })
  const [searchInput, setSearchInput] = useState('')
  const [restoreTarget, setRestoreTarget] = useState<Application | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<Application | null>(null)

  const { data, isLoading, isError } = useDeletedApplications(params)
  const { restoreApplication, permanentDeleteApplication } =
    useApplicationMutations()

  const handleSearchSubmit = () => {
    if (searchInput.trim()) {
      setParams((prev) => ({ ...prev, search: searchInput.trim(), page: 1 }))
    } else {
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

  const pagination = data?.pagination
  const applications = data?.applications ?? []

  return (
    <div className="space-y-6">
      {/* Retro Window Header */}
      <RetroWindow
        title="Applications Recycle Bin"
        icon={
          <img
            src={retroFolderIcon}
            alt="Recycle Bin"
            className="mt-1 h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7"
          />
        }
        count={pagination?.total}
        actions={
          <Link to="/applications">
            <RetroButton
              variant="secondary"
              icon={<ArrowLeft className="h-4 w-4" />}
            >
              <span className="hidden sm:inline">Back to Applications</span>
              <span className="sm:hidden">Back</span>
            </RetroButton>
          </Link>
        }
      >
        <p className="font-mono text-xs text-zinc-500">
          Restore or permanently delete applications
        </p>
      </RetroWindow>

      {/* Search */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-zinc-500" />
            <Input
              type="text"
              placeholder="Search deleted applications by position or company..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={handleSearchKeyDown}
              className="pl-10"
            />
          </div>
          <Button onClick={handleSearchSubmit}>Search</Button>
        </div>
      </div>

      {/* Table */}
      {isLoading ? (
        <div className="flex h-64 items-center justify-center">
          <div className="text-center">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent" />
            <p className="mt-3 text-sm text-zinc-500">
              Loading deleted applications...
            </p>
          </div>
        </div>
      ) : isError ? (
        <div className="flex h-64 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900">
          <p className="text-sm text-red-400">
            Failed to load deleted applications
          </p>
        </div>
      ) : applications.length > 0 ? (
        <>
          <div className="overflow-hidden rounded-xl border border-zinc-800">
            <table className="w-full">
              <thead className="border-b border-zinc-800 bg-zinc-900">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold tracking-wider text-zinc-400 uppercase">
                    Position & Company
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold tracking-wider text-zinc-400 uppercase">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold tracking-wider text-zinc-400 uppercase">
                    Applied Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold tracking-wider text-zinc-400 uppercase">
                    Deleted At
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-semibold tracking-wider text-zinc-400 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800 bg-zinc-950">
                {applications.map((application) => (
                  <tr
                    key={application.id}
                    className="transition-colors hover:bg-zinc-900/50"
                  >
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-white">
                          {application.position}
                        </div>
                        <div className="text-sm text-zinc-500">
                          {application.company.name}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge
                        variant="outline"
                        className={`${STATUS_COLORS[application.status]} border-0`}
                      >
                        {STATUS_LABELS[application.status]}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-sm text-zinc-400">
                      {new Date(application.appliedDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-zinc-400">
                      {application.deletedAt
                        ? new Date(application.deletedAt).toLocaleString()
                        : '-'}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setRestoreTarget(application)}
                        >
                          <RefreshCw className="mr-1.5 h-3.5 w-3.5" />
                          Restore
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => setDeleteTarget(application)}
                        >
                          <Trash2 className="mr-1.5 h-3.5 w-3.5" />
                          Delete Forever
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {pagination && pagination.totalPages > 1 && (
            <div className="flex items-center justify-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setParams((p) => ({ ...p, page: p.page! - 1 }))}
                disabled={params.page === 1}
              >
                Previous
              </Button>
              <span className="text-sm text-zinc-400">
                Page {pagination.page} of {pagination.totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setParams((p) => ({ ...p, page: p.page! + 1 }))}
                disabled={params.page === pagination.totalPages}
              >
                Next
              </Button>
            </div>
          )}
        </>
      ) : (
        <div className="space-y-3 rounded-xl border border-zinc-800 bg-zinc-900 p-12 text-center">
          <Briefcase className="text-zinc-750 mx-auto h-12 w-12" />
          <h3 className="text-lg font-bold text-white">
            No deleted applications
          </h3>
          <p className="text-zinc-550 mx-auto max-w-sm text-sm">
            {searchInput
              ? 'Try adjusting your search query'
              : 'Deleted applications will appear here'}
          </p>
        </div>
      )}

      {/* Dialogs */}
      {restoreTarget && (
        <ConfirmRestoreDialog
          application={restoreTarget}
          onConfirm={() => {
            restoreApplication.mutate(restoreTarget.id)
            setRestoreTarget(null)
          }}
          onCancel={() => setRestoreTarget(null)}
          isLoading={restoreApplication.isPending}
        />
      )}

      {deleteTarget && (
        <ConfirmPermanentDeleteDialog
          application={deleteTarget}
          onConfirm={() => {
            permanentDeleteApplication.mutate(deleteTarget.id)
            setDeleteTarget(null)
          }}
          onCancel={() => setDeleteTarget(null)}
          isLoading={permanentDeleteApplication.isPending}
        />
      )}
    </div>
  )
}
