import { useState, useCallback } from 'react'
import { Plus, Archive } from 'lucide-react'
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
import { RetroWindow, RetroButton } from '@/components/ui/retro-window'
import retroFolderIcon from '@/assets/retro-folder.png'

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
      {/* Retro Window Header */}
      <RetroWindow
        title="My Applications"
        icon={
          <img
            src={retroFolderIcon}
            alt="Applications"
            className="mt-1 h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7"
          />
        }
        count={pagination?.total}
        actions={
          <div className="flex items-center gap-2">
            <Link to="/applications/recycle-bin">
              <RetroButton
                variant="secondary"
                icon={<Archive className="h-4 w-4" />}
              >
                <span className="hidden sm:inline">Recycle Bin</span>
                <span className="sm:hidden">Bin</span>
              </RetroButton>
            </Link>
            <RetroButton
              variant="primary"
              icon={<Plus className="h-4 w-4" />}
              onClick={() => setIsFormOpen(true)}
            >
              <span className="hidden sm:inline">Add Application</span>
              <span className="sm:hidden">Add</span>
            </RetroButton>
          </div>
        }
      >
        <p className="font-mono text-xs text-zinc-500">
          Track and manage your job applications
        </p>
      </RetroWindow>

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
