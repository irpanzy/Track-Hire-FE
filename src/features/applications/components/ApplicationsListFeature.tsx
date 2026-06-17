import { useState, useCallback } from 'react'
import { Plus, Briefcase, Archive } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useApplications } from '../hooks/useApplications'
import { useApplicationMutations } from '../hooks/useApplicationMutations'
import type {
  ApplicationsQueryParams,
  Application,
} from '../types/applicationType'
import ApplicationsFilters from './ApplicationsFilters'
import ApplicationsTable from './ApplicationsTable'
import ApplicationFormDialog from './ApplicationFormDialog'
import ApplicationDetailDialog from './ApplicationDetailDialog'
import ConfirmDeleteDialog from './ConfirmDeleteDialog'

const LIMIT = 10

export default function ApplicationsListFeature() {
  const [params, setParams] = useState<ApplicationsQueryParams>({
    page: 1,
    limit: LIMIT,
    sortBy: 'appliedDate',
    order: 'desc',
  })
  const [searchInput, setSearchInput] = useState('')
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [selectedApp, setSelectedApp] = useState<Application | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<Application | null>(null)

  const { data, isLoading, isError } = useApplications(params)
  const { deleteApplication } = useApplicationMutations()

  const updateParam = useCallback(
    <K extends keyof ApplicationsQueryParams>(
      key: K,
      value: ApplicationsQueryParams[K]
    ) => {
      setParams((prev) => ({ ...prev, [key]: value, page: 1 }))
    },
    []
  )

  const handleSearchSubmit = () => {
    if (searchInput.trim()) {
      updateParam('search', searchInput.trim())
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

  const handleToggleSort = (field: ApplicationsQueryParams['sortBy']) => {
    setParams((prev) => ({
      ...prev,
      sortBy: field,
      order: prev.sortBy === field && prev.order === 'asc' ? 'desc' : 'asc',
      page: 1,
    }))
  }

  const handleViewDetail = (application: Application) => {
    setSelectedApp(application)
    setIsDetailOpen(true)
  }

  const handleEdit = (application: Application) => {
    setSelectedApp(application)
    setIsFormOpen(true)
  }

  const handleCloseForm = () => {
    setIsFormOpen(false)
    setSelectedApp(null)
  }

  const handleCloseDetail = () => {
    setIsDetailOpen(false)
    setSelectedApp(null)
  }

  const pagination = data?.pagination
  const applications = data?.applications ?? []

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">My Applications</h1>
          <p className="mt-0.5 text-sm text-zinc-500">
            Track and manage your job applications
          </p>
        </div>
        <div className="flex items-center gap-3">
          {pagination && (
            <div className="hidden items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2 sm:flex">
              <Briefcase className="h-4 w-4 text-indigo-400" />
              <span className="text-sm font-semibold text-white">
                {pagination.total}
              </span>
              <span className="text-sm text-zinc-500">applications</span>
            </div>
          )}
          <Link to="/applications/recycle-bin">
            <button className="flex cursor-pointer items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-zinc-800 active:scale-95">
              <Archive className="h-4 w-4" />
              <span className="hidden sm:inline">Recycle Bin</span>
              <span className="sm:hidden">Bin</span>
            </button>
          </Link>
          <button
            onClick={() => setIsFormOpen(true)}
            className="flex cursor-pointer items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition-all hover:bg-indigo-500 active:scale-95"
          >
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Add Application</span>
            <span className="sm:hidden">Add</span>
          </button>
        </div>
      </div>

      <ApplicationsFilters
        searchInput={searchInput}
        status={params.status || ''}
        source={params.source || ''}
        jobType={params.jobType || ''}
        order={params.order}
        onSearchInputChange={setSearchInput}
        onSearchSubmit={handleSearchSubmit}
        onSearchKeyDown={handleSearchKeyDown}
        onStatusChange={(status) => {
          if (status) {
            updateParam('status', status as any)
          } else {
            setParams((prev) => {
              const newParams = { ...prev, page: 1 }
              delete newParams.status
              return newParams
            })
          }
        }}
        onSourceChange={(source) => {
          if (source) {
            updateParam('source', source as any)
          } else {
            setParams((prev) => {
              const newParams = { ...prev, page: 1 }
              delete newParams.source
              return newParams
            })
          }
        }}
        onJobTypeChange={(jobType) => {
          if (jobType) {
            updateParam('jobType', jobType as any)
          } else {
            setParams((prev) => {
              const newParams = { ...prev, page: 1 }
              delete newParams.jobType
              return newParams
            })
          }
        }}
        onOrderChange={(order) => setParams((p) => ({ ...p, order, page: 1 }))}
      />

      <ApplicationsTable
        applications={applications}
        isLoading={isLoading}
        isError={isError}
        pagination={pagination}
        sortBy={params.sortBy}
        order={params.order}
        onToggleSort={handleToggleSort}
        onViewDetail={handleViewDetail}
        onEdit={handleEdit}
        onDelete={setDeleteTarget}
        onPageChange={(page) => setParams((p) => ({ ...p, page }))}
      />

      {/* Dialogs */}
      {isFormOpen && (
        <ApplicationFormDialog
          application={selectedApp}
          onClose={handleCloseForm}
        />
      )}

      {isDetailOpen && selectedApp && (
        <ApplicationDetailDialog
          applicationId={selectedApp.id}
          onClose={handleCloseDetail}
          onEdit={() => {
            setIsDetailOpen(false)
            setIsFormOpen(true)
          }}
          onDelete={() => {
            setIsDetailOpen(false)
            setDeleteTarget(selectedApp)
          }}
        />
      )}

      {deleteTarget && (
        <ConfirmDeleteDialog
          application={deleteTarget}
          onConfirm={() => {
            deleteApplication.mutate(deleteTarget.id)
            setDeleteTarget(null)
          }}
          onCancel={() => setDeleteTarget(null)}
          isLoading={deleteApplication.isPending}
        />
      )}
    </div>
  )
}
