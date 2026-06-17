import { useState } from 'react'
import { Trash2, RefreshCw, Search, Building2 } from 'lucide-react'
import { useDeletedCompanies } from '../hooks/useCompanies'
import { useCompanyMutations } from '../hooks/useCompanyMutations'
import type { Company, CompaniesQueryParams } from '../types/companyType'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import ConfirmRestoreDialog from './ConfirmRestoreDialog'
import ConfirmPermanentDeleteDialog from './ConfirmPermanentDeleteDialog'

const LIMIT = 10

export default function CompaniesRecycleBinFeature() {
  const [params, setParams] = useState<CompaniesQueryParams>({
    page: 1,
    limit: LIMIT,
    sortBy: 'createdAt',
    order: 'desc',
  })
  const [searchInput, setSearchInput] = useState('')
  const [restoreTarget, setRestoreTarget] = useState<Company | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<Company | null>(null)

  const { data, isLoading, isError } = useDeletedCompanies(params)
  const { restoreCompany, permanentDeleteCompany } = useCompanyMutations()

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
  const companies = data?.companies ?? []

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Companies Recycle Bin</h1>
          <p className="mt-0.5 text-sm text-zinc-500">
            Restore or permanently delete companies
          </p>
        </div>
        {pagination && (
          <div className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2">
            <Trash2 className="h-4 w-4 text-red-400" />
            <span className="text-sm font-semibold text-white">
              {pagination.total}
            </span>
            <span className="text-sm text-zinc-500">deleted</span>
          </div>
        )}
      </div>

      {/* Search */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-zinc-500" />
            <Input
              type="text"
              placeholder="Search deleted companies..."
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
            <p className="mt-3 text-sm text-zinc-500">Loading deleted companies...</p>
          </div>
        </div>
      ) : isError ? (
        <div className="flex h-64 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900">
          <p className="text-sm text-red-400">Failed to load deleted companies</p>
        </div>
      ) : companies.length > 0 ? (
        <>
          <div className="overflow-hidden rounded-xl border border-zinc-800">
            <table className="w-full">
              <thead className="border-b border-zinc-800 bg-zinc-900">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-zinc-400">
                    Company
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-zinc-400">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-zinc-400">
                    Deleted At
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-zinc-400">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800 bg-zinc-950">
                {companies.map((company) => (
                  <tr key={company.id} className="transition-colors hover:bg-zinc-900/50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900 font-bold text-white">
                          {company.name[0]?.toUpperCase()}
                        </div>
                        <div>
                          <div className="font-medium text-white">{company.name}</div>
                          {company.website && (
                            <div className="text-xs text-zinc-500">{company.website}</div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-zinc-400">
                      {company.location || '-'}
                    </td>
                    <td className="px-6 py-4 text-sm text-zinc-400">
                      {company.deletedAt
                        ? new Date(company.deletedAt).toLocaleString()
                        : '-'}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setRestoreTarget(company)}
                        >
                          <RefreshCw className="h-3.5 w-3.5 mr-1.5" />
                          Restore
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => setDeleteTarget(company)}
                        >
                          <Trash2 className="h-3.5 w-3.5 mr-1.5" />
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
          <Building2 className="mx-auto h-12 w-12 text-zinc-750" />
          <h3 className="text-lg font-bold text-white">No deleted companies</h3>
          <p className="mx-auto max-w-sm text-sm text-zinc-550">
            {searchInput
              ? 'Try adjusting your search query'
              : 'Deleted companies will appear here'}
          </p>
        </div>
      )}

      {/* Dialogs */}
      {restoreTarget && (
        <ConfirmRestoreDialog
          company={restoreTarget}
          onConfirm={() => {
            restoreCompany.mutate(restoreTarget.id)
            setRestoreTarget(null)
          }}
          onCancel={() => setRestoreTarget(null)}
          isLoading={restoreCompany.isPending}
        />
      )}

      {deleteTarget && (
        <ConfirmPermanentDeleteDialog
          company={deleteTarget}
          onConfirm={() => {
            permanentDeleteCompany.mutate(deleteTarget.id)
            setDeleteTarget(null)
          }}
          onCancel={() => setDeleteTarget(null)}
          isLoading={permanentDeleteCompany.isPending}
        />
      )}
    </div>
  )
}
