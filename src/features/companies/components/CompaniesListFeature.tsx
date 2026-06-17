import { useState, useCallback } from 'react'
import { Plus, Building2, Globe, ExternalLink, Edit2, Trash2, Eye, Archive } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useCompanies } from '../hooks/useCompanies'
import { useCompanyMutations } from '../hooks/useCompanyMutations'
import type { Company, CompaniesQueryParams } from '../types/companyType'
import CompaniesFilters from './CompaniesFilters'
import CompanyFormDialog from './CompanyFormDialog'
import CompanyDetailDialog from './CompanyDetailDialog'
import ConfirmDeleteDialog from './ConfirmDeleteDialog'
import { Button } from '@/components/ui/button'

const LIMIT = 12

export default function CompaniesListFeature() {
  const [params, setParams] = useState<CompaniesQueryParams>({
    page: 1,
    limit: LIMIT,
    sortBy: 'name',
    order: 'asc',
    userOnly: false,
  })
  const [searchInput, setSearchInput] = useState('')
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<Company | null>(null)

  const { data, isLoading, isError } = useCompanies(params)
  const { deleteCompany } = useCompanyMutations()

  const updateParam = useCallback(
    <K extends keyof CompaniesQueryParams>(
      key: K,
      value: CompaniesQueryParams[K]
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

  const handleViewDetail = (company: Company) => {
    setSelectedCompany(company)
    setIsDetailOpen(true)
  }

  const handleEdit = (company: Company) => {
    setSelectedCompany(company)
    setIsFormOpen(true)
  }

  const handleCloseForm = () => {
    setIsFormOpen(false)
    setSelectedCompany(null)
  }

  const handleCloseDetail = () => {
    setIsDetailOpen(false)
    setSelectedCompany(null)
  }

  const pagination = data?.pagination
  const companies = data?.companies ?? []

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Companies</h1>
          <p className="mt-0.5 text-sm text-zinc-500">
            Manage and track company intelligence for your job search
          </p>
        </div>
        <div className="flex items-center gap-3">
          {pagination && (
            <div className="hidden items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2 sm:flex">
              <Building2 className="h-4 w-4 text-indigo-400" />
              <span className="text-sm font-semibold text-white">
                {pagination.total}
              </span>
              <span className="text-sm text-zinc-500">companies</span>
            </div>
          )}
          <Link to="/companies/recycle-bin">
            <Button variant="outline" size="sm">
              <Archive className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Recycle Bin</span>
              <span className="sm:hidden">Bin</span>
            </Button>
          </Link>
          <Button onClick={() => setIsFormOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Add Company</span>
            <span className="sm:hidden">Add</span>
          </Button>
        </div>
      </div>

      <CompaniesFilters
        searchInput={searchInput}
        userOnly={params.userOnly || false}
        order={params.order}
        onSearchInputChange={setSearchInput}
        onSearchSubmit={handleSearchSubmit}
        onSearchKeyDown={handleSearchKeyDown}
        onUserOnlyChange={(userOnly) => setParams((p) => ({ ...p, userOnly, page: 1 }))}
        onOrderChange={(order) => setParams((p) => ({ ...p, order, page: 1 }))}
      />

      {/* Companies Grid */}
      {isLoading ? (
        <div className="flex h-64 items-center justify-center">
          <div className="text-center">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent" />
            <p className="mt-3 text-sm text-zinc-500">Loading companies...</p>
          </div>
        </div>
      ) : isError ? (
        <div className="flex h-64 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900">
          <p className="text-sm text-red-400">Failed to load companies</p>
        </div>
      ) : companies.length > 0 ? (
        <>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {companies.map((company) => (
              <div
                key={company.id}
                className="group flex h-48 flex-col justify-between rounded-xl border border-zinc-800 bg-zinc-900 p-5 shadow-sm transition-colors hover:border-zinc-700"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-950 text-lg font-bold text-white transition-colors group-hover:text-indigo-400">
                      {company.name[0]?.toUpperCase()}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white transition-colors group-hover:text-indigo-300">
                        {company.name}
                      </h3>
                      {company.location && (
                        <p className="text-xs text-zinc-500">
                          {company.location}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {company.website && (
                      <a
                        href={company.website}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-md border border-zinc-800 bg-zinc-950 p-1.5 text-zinc-500 transition-colors hover:text-white"
                        title="Visit website"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    )}
                    <button
                      onClick={() => handleViewDetail(company)}
                      className="cursor-pointer rounded-md border border-zinc-800 bg-zinc-950 p-1.5 text-zinc-500 transition-colors hover:text-indigo-400"
                      title="View details"
                    >
                      <Eye className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => handleEdit(company)}
                      className="cursor-pointer rounded-md border border-zinc-800 bg-zinc-950 p-1.5 text-zinc-500 transition-colors hover:text-indigo-400"
                      title="Edit company"
                    >
                      <Edit2 className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => setDeleteTarget(company)}
                      className="cursor-pointer rounded-md border border-zinc-800 bg-zinc-950 p-1.5 text-zinc-500 transition-colors hover:text-red-400"
                      title="Delete company"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-zinc-850 pt-4">
                  <div className="text-xs text-zinc-500">
                    Added {new Date(company.createdAt).toLocaleDateString()}
                  </div>
                  {company.website && (
                    <a
                      href={company.website}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-350"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Globe className="h-3.5 w-3.5" />
                      Visit site
                    </a>
                  )}
                </div>
              </div>
            ))}
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
          <Building2 className="mx-auto h-12 w-12 text-zinc-750" />
          <h3 className="text-lg font-bold text-white">No companies found</h3>
          <p className="mx-auto max-w-sm text-sm text-zinc-550">
            {searchInput
              ? 'Try adjusting your search query'
              : 'Add a new target company to start tracking'}
          </p>
        </div>
      )}

      {/* Dialogs */}
      {isFormOpen && (
        <CompanyFormDialog
          company={selectedCompany}
          onClose={handleCloseForm}
        />
      )}

      {isDetailOpen && selectedCompany && (
        <CompanyDetailDialog
          companyId={selectedCompany.id}
          onClose={handleCloseDetail}
          onEdit={() => {
            setIsDetailOpen(false)
            setIsFormOpen(true)
          }}
          onDelete={() => {
            setIsDetailOpen(false)
            setDeleteTarget(selectedCompany)
          }}
        />
      )}

      {deleteTarget && (
        <ConfirmDeleteDialog
          company={deleteTarget}
          onConfirm={() => {
            deleteCompany.mutate(deleteTarget.id)
            setDeleteTarget(null)
          }}
          onCancel={() => setDeleteTarget(null)}
          isLoading={deleteCompany.isPending}
        />
      )}
    </div>
  )
}
