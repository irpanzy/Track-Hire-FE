import { useState } from 'react'
import { Trash2, RefreshCw, Search, Building2, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useDeletedCompanies } from '../hooks/useCompanies'
import { useCompanyMutations } from '../hooks/useCompanyMutations'
import type { Company, CompaniesQueryParams } from '../types/companyType'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import ConfirmRestoreDialog from './ConfirmRestoreDialog'
import ConfirmPermanentDeleteDialog from './ConfirmPermanentDeleteDialog'
import { RetroWindow, RetroButton } from '@/components/ui/retro-window'
import retroCompanyIcon from '@/assets/retro-company.png'

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
      {/* Retro Window Header */}
      <RetroWindow
        title="Companies Recycle Bin"
        icon={
          <img
            src={retroCompanyIcon}
            alt="Recycle Bin"
            className="mt-1 h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7"
          />
        }
        count={pagination?.total}
        actions={
          <Link to="/companies">
            <RetroButton
              variant="secondary"
              icon={<ArrowLeft className="h-4 w-4" />}
            >
              <span className="hidden sm:inline">Back to Companies</span>
              <span className="sm:hidden">Back</span>
            </RetroButton>
          </Link>
        }
      >
        <p className="font-mono text-xs text-zinc-500">
          Restore or permanently delete companies
        </p>
      </RetroWindow>

      {/* Search */}
      <div className="glass rounded-xl p-4">
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
            <p className="mt-3 text-sm text-zinc-500">
              Loading deleted companies...
            </p>
          </div>
        </div>
      ) : isError ? (
        <div className="glass flex h-64 items-center justify-center rounded-xl">
          <p className="text-sm text-red-400">
            Failed to load deleted companies
          </p>
        </div>
      ) : companies.length > 0 ? (
        <>
          <div className="glass overflow-hidden rounded-xl">
            <table className="w-full">
              <thead className="border-b border-white/[0.06] bg-white/[0.02]">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold tracking-wider text-zinc-400 uppercase">
                    Company
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold tracking-wider text-zinc-400 uppercase">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold tracking-wider text-zinc-400 uppercase">
                    Deleted At
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-semibold tracking-wider text-zinc-400 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.05]">
                {companies.map((company) => (
                  <tr
                    key={company.id}
                    className="transition-colors hover:bg-zinc-900/50"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.04] font-bold text-white">
                          {company.name.substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <div className="font-medium text-white">
                            {company.name}
                          </div>
                          {company.website && (
                            <div className="text-xs text-zinc-500">
                              {company.website}
                            </div>
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
                          <RefreshCw className="mr-1.5 h-3.5 w-3.5" />
                          Restore
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => setDeleteTarget(company)}
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
        <div className="glass space-y-3 rounded-xl p-12 text-center">
          <Building2 className="text-zinc-750 mx-auto h-12 w-12" />
          <h3 className="text-lg font-bold text-white">No deleted companies</h3>
          <p className="text-zinc-550 mx-auto max-w-sm text-sm">
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
