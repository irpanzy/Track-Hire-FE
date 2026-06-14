import { useState, useEffect } from 'react'
import {
  Globe,
  ExternalLink,
  Briefcase,
  Plus,
  Edit2,
  Trash2,
  X,
  Search,
  Building2,
} from 'lucide-react'
import {
  getMockCompanies,
  saveMockCompanies,
  getMockApplications,
  type MockCompany,
} from '../../lib/mockData'
import { toast } from 'sonner'

export default function Companies() {
  const [companies, setCompanies] = useState<MockCompany[]>([])
  const [activeAppCounts, setActiveAppCounts] = useState<
    Record<string, number>
  >({})
  const [searchTerm, setSearchTerm] = useState('')

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [selectedCompany, setSelectedCompany] = useState<MockCompany | null>(
    null
  )

  // Form fields
  const [name, setName] = useState('')
  const [industry, setIndustry] = useState('')
  const [website, setWebsite] = useState('')

  useEffect(() => {
    const loadedCompanies = getMockCompanies()
    setCompanies(loadedCompanies)

    // Calculate active application counts from applications list
    const apps = getMockApplications()
    const counts: Record<string, number> = {}
    apps.forEach((app) => {
      const companyName = app.company.toLowerCase().trim()
      counts[companyName] = (counts[companyName] || 0) + 1
    })
    setActiveAppCounts(counts)
  }, [])

  const resetForm = () => {
    setName('')
    setIndustry('')
    setWebsite('')
  }

  const handleOpenAddModal = () => {
    resetForm()
    setIsAddModalOpen(true)
  }

  const handleAddCompany = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !industry) {
      toast.error('Company Name and Industry are required')
      return
    }

    // Format website URL if missing protocol
    let formattedWebsite = website
    if (website && !/^https?:\/\//i.test(website)) {
      formattedWebsite = 'https://' + website
    }

    const newCompany: MockCompany = {
      id: 'c-' + Date.now(),
      name,
      industry,
      website: formattedWebsite,
    }

    const updated = [...companies, newCompany]
    setCompanies(updated)
    saveMockCompanies(updated)
    setIsAddModalOpen(false)
    toast.success('Company added successfully!')
  }

  const handleOpenEditModal = (company: MockCompany) => {
    setSelectedCompany(company)
    setName(company.name)
    setIndustry(company.industry)
    setWebsite(company.website)
    setIsEditModalOpen(true)
  }

  const handleUpdateCompany = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedCompany) return

    let formattedWebsite = website
    if (website && !/^https?:\/\//i.test(website)) {
      formattedWebsite = 'https://' + website
    }

    const updated = companies.map((c) => {
      if (c.id === selectedCompany.id) {
        return {
          ...c,
          name,
          industry,
          website: formattedWebsite,
        }
      }
      return c
    })

    setCompanies(updated)
    saveMockCompanies(updated)
    setIsEditModalOpen(false)
    toast.success('Company details updated!')
  }

  const handleDeleteCompany = (id: string, companyName: string) => {
    if (confirm(`Are you sure you want to delete ${companyName}?`)) {
      const updated = companies.filter((c) => c.id !== id)
      setCompanies(updated)
      saveMockCompanies(updated)
      toast.success('Company deleted successfully')
    }
  }

  const filteredCompanies = companies.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.industry.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white">
            Companies
          </h1>
          <p className="mt-1 text-zinc-400">
            Manage and track company intelligence for your job search.
          </p>
        </div>
        <button
          onClick={handleOpenAddModal}
          className="bg-indigo-650 flex cursor-pointer items-center gap-2 self-start rounded-lg px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/10 transition-all hover:bg-indigo-600 hover:shadow-indigo-600/20 active:scale-95 sm:self-auto"
        >
          <Plus className="h-4 w-4" />
          Add Company
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative rounded-xl border border-zinc-800 bg-zinc-900 p-4 shadow-sm">
        <Search className="absolute top-7 left-7 h-4 w-4 text-zinc-500" />
        <input
          type="text"
          placeholder="Search companies by name or industry..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full rounded-lg border border-zinc-800 bg-zinc-950 py-2 pr-4 pl-9 text-sm text-white placeholder-zinc-700 transition-all outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
        />
      </div>

      {/* Companies Grid */}
      {filteredCompanies.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCompanies.map((company) => {
            const activeCount =
              activeAppCounts[company.name.toLowerCase().trim()] || 0
            return (
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
                      <p className="text-xs text-zinc-500">
                        {company.industry}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {company.website && (
                      <a
                        href={company.website}
                        target="_blank"
                        rel="noreferrer"
                        className="text-zinc-550 rounded-md border border-zinc-800 bg-zinc-950 p-1.5 transition-colors hover:text-white"
                        title="Visit website"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    )}
                    <button
                      onClick={() => handleOpenEditModal(company)}
                      className="text-zinc-550 cursor-pointer rounded-md border border-zinc-800 bg-zinc-950 p-1.5 transition-colors hover:text-indigo-400"
                      title="Edit company"
                    >
                      <Edit2 className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() =>
                        handleDeleteCompany(company.id, company.name)
                      }
                      className="text-zinc-550 cursor-pointer rounded-md border border-zinc-800 bg-zinc-950 p-1.5 transition-colors hover:text-red-400"
                      title="Delete company"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                <div className="border-zinc-850 flex items-center justify-between border-t pt-4">
                  <div className="flex items-center gap-1.5 text-xs text-zinc-400">
                    <Briefcase className="h-4 w-4 text-zinc-500" />
                    <span>
                      {activeCount} Active App{activeCount !== 1 ? 's' : ''}
                    </span>
                  </div>
                  {company.website && (
                    <a
                      href={company.website}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-indigo-350 flex items-center gap-1 text-xs text-indigo-400"
                    >
                      <Globe className="h-3.5 w-3.5" />
                      Visit site
                    </a>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="space-y-3 rounded-xl border border-zinc-800 bg-zinc-900 p-12 text-center">
          <Building2 className="text-zinc-750 mx-auto h-12 w-12" />
          <h3 className="text-lg font-bold text-white">No companies found</h3>
          <p className="text-zinc-550 mx-auto max-w-sm text-sm">
            Try adjusting your search query, or add a new target company to
            track.
          </p>
        </div>
      )}

      {/* Add Company Modal */}
      {isAddModalOpen && (
        <div className="animate-fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="animate-zoom-in w-full max-w-md rounded-xl border border-zinc-800 bg-zinc-900 shadow-2xl">
            <div className="flex items-center justify-between border-b border-zinc-800 p-5">
              <h2 className="flex items-center gap-2 text-lg font-bold text-white">
                <Building2 className="h-5 w-5 text-indigo-400" />
                Add Target Company
              </h2>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="cursor-pointer rounded-lg p-1 text-zinc-400 transition-colors hover:bg-zinc-800"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleAddCompany} className="space-y-4 p-5">
              <div className="space-y-1.5">
                <label className="text-zinc-450 text-xs font-semibold">
                  Company Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Google"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3.5 py-2 text-sm text-white placeholder-zinc-700 transition-all outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-zinc-450 text-xs font-semibold">
                  Industry *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Technology / Artificial Intelligence"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  required
                  className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3.5 py-2 text-sm text-white placeholder-zinc-700 transition-all outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-zinc-450 text-xs font-semibold">
                  Website URL
                </label>
                <input
                  type="text"
                  placeholder="e.g. www.google.com"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3.5 py-2 text-sm text-white placeholder-zinc-700 transition-all outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div className="flex justify-end gap-3 border-t border-zinc-800 pt-4">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="bg-zinc-850 cursor-pointer rounded-lg px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-zinc-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="cursor-pointer rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-md shadow-indigo-600/10 transition-all hover:bg-indigo-500 hover:shadow-indigo-600/20"
                >
                  Add Company
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Company Modal */}
      {isEditModalOpen && (
        <div className="animate-fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="animate-zoom-in w-full max-w-md rounded-xl border border-zinc-800 bg-zinc-900 shadow-2xl">
            <div className="flex items-center justify-between border-b border-zinc-800 p-5">
              <h2 className="flex items-center gap-2 text-lg font-bold text-white">
                <Building2 className="h-5 w-5 text-indigo-400" />
                Edit Target Company
              </h2>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="cursor-pointer rounded-lg p-1 text-zinc-400 transition-colors hover:bg-zinc-800"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleUpdateCompany} className="space-y-4 p-5">
              <div className="space-y-1.5">
                <label className="text-zinc-450 text-xs font-semibold">
                  Company Name *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3.5 py-2 text-sm text-white placeholder-zinc-700 transition-all outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-zinc-450 text-xs font-semibold">
                  Industry *
                </label>
                <input
                  type="text"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  required
                  className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3.5 py-2 text-sm text-white placeholder-zinc-700 transition-all outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-zinc-450 text-xs font-semibold">
                  Website URL
                </label>
                <input
                  type="text"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3.5 py-2 text-sm text-white placeholder-zinc-700 transition-all outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div className="flex justify-end gap-3 border-t border-zinc-800 pt-4">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="bg-zinc-850 cursor-pointer rounded-lg px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-zinc-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="cursor-pointer rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-md shadow-indigo-600/10 transition-all hover:bg-indigo-500 hover:shadow-indigo-600/20"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
