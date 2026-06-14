import { useState, useEffect } from 'react'
import {
  Briefcase,
  MapPin,
  DollarSign,
  ExternalLink,
  Calendar,
  Search,
  Filter,
  Plus,
  Edit2,
  Trash2,
  X,
  Sparkles,
  Loader2,
  Info,
} from 'lucide-react'
import {
  getMockApplications,
  saveMockApplications,
  type MockApplication,
} from '../../lib/mockData'
import { toast } from 'sonner'

export default function Applications() {
  const [applications, setApplications] = useState<MockApplication[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [selectedApp, setSelectedApp] = useState<MockApplication | null>(null)

  // Form fields
  const [role, setRole] = useState('')
  const [company, setCompany] = useState('')
  const [location, setLocation] = useState('')
  const [salary, setSalary] = useState('')
  const [status, setStatus] = useState<MockApplication['status']>('Applied')
  const [source, setSource] = useState<MockApplication['source']>('LinkedIn')
  const [sourceUrl, setSourceUrl] = useState('')
  const [description, setDescription] = useState('')
  const [requirements, setRequirements] = useState('')
  const [notes, setNotes] = useState('')

  // AI URL Scraping state
  const [importUrl, setImportUrl] = useState('')
  const [isExtracting, setIsExtracting] = useState(false)
  const [showAiAlert, setShowAiAlert] = useState(false)

  useEffect(() => {
    setApplications(getMockApplications())
  }, [])

  // CRUD actions
  const resetForm = () => {
    setRole('')
    setCompany('')
    setLocation('')
    setSalary('')
    setStatus('Applied')
    setSource('LinkedIn')
    setSourceUrl('')
    setDescription('')
    setRequirements('')
    setNotes('')
    setImportUrl('')
    setShowAiAlert(false)
  }

  const handleOpenAddModal = () => {
    resetForm()
    setIsAddModalOpen(true)
  }

  const handleSimulateAiExtract = () => {
    if (!importUrl) {
      toast.error('Please enter a valid URL')
      return
    }

    setIsExtracting(true)

    // Simulate Gemini API call delay
    setTimeout(() => {
      setIsExtracting(false)
      // Extract position / company from URL or use mock defaults
      let mockRole = 'React Software Engineer'
      let mockCompany = 'TechCorp'

      if (importUrl.toLowerCase().includes('google')) {
        mockRole = 'Senior Frontend Engineer (L5)'
        mockCompany = 'Google'
      } else if (
        importUrl.toLowerCase().includes('meta') ||
        importUrl.toLowerCase().includes('facebook')
      ) {
        mockRole = 'Product Engineer (React & GraphQL)'
        mockCompany = 'Meta'
      } else if (importUrl.toLowerCase().includes('linkedin')) {
        mockRole = 'Staff UI Developer'
        mockCompany = 'LinkedIn'
      }

      setRole(mockRole)
      setCompany(mockCompany)
      setLocation('Hybrid (Jakarta, Indonesia)')
      setSalary('IDR 25,000,000 - 35,000,000 / month')
      setSourceUrl(importUrl)
      setDescription(
        'We are looking for a software engineer to build premium React dashboards, optimize client-side bundle performance, and collaborate with product designers to design rich interactive animations.'
      )
      setRequirements(
        'Experience with React (Next.js/Vite), TypeScript, Tailwind CSS, State Management (Zustand/Redux), and performance optimizations.'
      )
      setSource('LinkedIn')

      setShowAiAlert(true)
      toast.success('Successfully extracted details from URL using Gemini AI!')
    }, 1500)
  }

  const handleAddApplication = (e: React.FormEvent) => {
    e.preventDefault()
    if (!role || !company) {
      toast.error('Position and Company Name are required')
      return
    }

    const newApp: MockApplication = {
      id: 'a-' + Date.now(),
      role,
      company,
      location: location || 'Remote',
      salary: salary || 'Undisclosed',
      status,
      source,
      sourceUrl,
      description,
      requirements,
      notes,
      date: new Date().toISOString().split('T')[0],
    }

    const updated = [newApp, ...applications]
    setApplications(updated)
    saveMockApplications(updated)
    setIsAddModalOpen(false)
    toast.success('Application added successfully!')
  }

  const handleOpenEditModal = (app: MockApplication) => {
    setSelectedApp(app)
    setRole(app.role)
    setCompany(app.company)
    setLocation(app.location)
    setSalary(app.salary)
    setStatus(app.status)
    setSource(app.source)
    setSourceUrl(app.sourceUrl || '')
    setDescription(app.description || '')
    setRequirements(app.requirements || '')
    setNotes(app.notes || '')
    setIsEditModalOpen(true)
  }

  const handleUpdateApplication = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedApp) return

    const updated = applications.map((app) => {
      if (app.id === selectedApp.id) {
        return {
          ...app,
          role,
          company,
          location,
          salary,
          status,
          source,
          sourceUrl,
          description,
          requirements,
          notes,
        }
      }
      return app
    })

    setApplications(updated)
    saveMockApplications(updated)
    setIsEditModalOpen(false)
    toast.success('Application updated successfully!')
  }

  const handleDeleteApplication = (id: string) => {
    if (confirm('Are you sure you want to delete this application?')) {
      const updated = applications.filter((app) => app.id !== id)
      setApplications(updated)
      saveMockApplications(updated)
      toast.success('Application deleted successfully')
    }
  }

  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.company.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus =
      statusFilter === 'All' ||
      app.status === statusFilter ||
      (statusFilter === 'Interviewing' &&
        [
          'Interviewing',
          'Screening',
          'Technical Test',
          'HR Interview',
        ].includes(app.status)) ||
      (statusFilter === 'Offered' &&
        ['Offered', 'Offering', 'Accepted'].includes(app.status))

    return matchesSearch && matchesStatus
  })

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white">
            Applications
          </h1>
          <p className="mt-1 text-zinc-400">
            Keep track of all your ongoing job applications here.
          </p>
        </div>
        <button
          onClick={handleOpenAddModal}
          className="bg-indigo-650 flex cursor-pointer items-center gap-2 self-start rounded-lg px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/10 transition-all hover:bg-indigo-600 hover:shadow-indigo-600/20 active:scale-95 sm:self-auto"
        >
          <Plus className="h-4 w-4" />
          Add Application
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="grid grid-cols-1 gap-4 rounded-xl border border-zinc-800 bg-zinc-900 p-4 shadow-sm sm:grid-cols-3">
        <div className="relative col-span-2">
          <Search className="absolute top-3 left-3 h-4 w-4 text-zinc-500" />
          <input
            type="text"
            placeholder="Search by job title or company name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-zinc-800 bg-zinc-950 py-2 pr-4 pl-9 text-sm text-white placeholder-zinc-700 transition-all outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          />
        </div>
        <div className="relative">
          <Filter className="absolute top-3 left-3 h-4 w-4 text-zinc-500" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full cursor-pointer appearance-none rounded-lg border border-zinc-800 bg-zinc-950 py-2 pr-4 pl-9 text-sm text-white transition-all outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          >
            <option value="All">All Statuses</option>
            <option value="Applied">Applied</option>
            <option value="Interviewing">Interviewing / Screening</option>
            <option value="Offered">Offered / Accepted</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Applications Table / List */}
      <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 shadow-sm">
        {filteredApplications.length > 0 ? (
          <div className="divide-y divide-zinc-800">
            {filteredApplications.map((app) => (
              <div
                key={app.id}
                className="hover:bg-zinc-850/40 group flex flex-col justify-between gap-4 p-5 transition-colors md:flex-row md:items-center"
              >
                <div className="flex-1 space-y-2">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h3 className="text-lg font-bold text-white transition-colors group-hover:text-indigo-300">
                      {app.role}
                    </h3>
                    <span className="text-zinc-550 font-normal">at</span>
                    <span className="font-semibold text-zinc-300">
                      {app.company}
                    </span>

                    <span
                      className={`inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${
                        ['Offered', 'Offering', 'Accepted'].includes(app.status)
                          ? 'bg-emerald-500/10 text-emerald-400 ring-emerald-500/20'
                          : [
                                'Interviewing',
                                'Screening',
                                'Technical Test',
                                'HR Interview',
                              ].includes(app.status)
                            ? 'bg-amber-500/10 text-amber-400 ring-amber-500/20'
                            : app.status === 'Rejected'
                              ? 'bg-red-500/10 text-red-400 ring-red-500/20'
                              : 'bg-indigo-500/10 text-indigo-400 ring-indigo-500/20'
                      }`}
                    >
                      {app.status}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-zinc-400">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-zinc-500" />
                      {app.location}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <DollarSign className="h-3.5 w-3.5 text-zinc-500" />
                      {app.salary}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 text-zinc-500" />
                      Applied:{' '}
                      {new Date(app.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end md:self-auto">
                  <span className="text-zinc-450 border-zinc-850 rounded-md border bg-zinc-950 px-2.5 py-1 text-xs font-medium">
                    {app.source}
                  </span>

                  <div className="flex items-center gap-1">
                    {app.sourceUrl && (
                      <a
                        href={app.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cursor-pointer rounded-lg border border-zinc-800 bg-zinc-950 p-2 text-zinc-400 transition-colors hover:text-white"
                        title="View job posting"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                    <button
                      onClick={() => handleOpenEditModal(app)}
                      className="text-indigo-450 cursor-pointer rounded-lg border border-zinc-800 bg-zinc-950 p-2 transition-colors hover:bg-zinc-800 hover:text-indigo-300"
                      title="Edit application details"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteApplication(app.id)}
                      className="cursor-pointer rounded-lg border border-zinc-800 bg-zinc-950 p-2 text-red-500 transition-colors hover:bg-red-500/10 hover:text-red-400"
                      title="Delete application"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3 p-12 text-center">
            <Briefcase className="text-zinc-750 mx-auto h-12 w-12" />
            <h3 className="text-lg font-bold text-white">
              No applications found
            </h3>
            <p className="mx-auto max-w-sm text-sm text-zinc-500">
              Try adjusting your search query or filter, or add a new job
              application.
            </p>
          </div>
        )}
      </div>

      {/* Add Application Modal */}
      {isAddModalOpen && (
        <div className="animate-fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="animate-zoom-in max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl border border-zinc-800 bg-zinc-900 shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-zinc-800 p-5">
              <h2 className="flex items-center gap-2 text-xl font-bold text-white">
                <Briefcase className="h-5 w-5 text-indigo-400" />
                Add New Job Application
              </h2>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="cursor-pointer rounded-lg p-1 text-zinc-400 transition-colors hover:bg-zinc-800"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* AI Autofill Banner Section */}
            <div className="space-y-3 border-b border-zinc-800 bg-indigo-950/20 p-5">
              <label className="flex items-center gap-1.5 text-xs font-semibold text-indigo-300">
                <Sparkles className="h-4 w-4 text-indigo-400" />
                Gemini AI Job Details Scraper (Instant Auto-fill)
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Paste job posting URL (e.g., LinkedIn, Glints, Jobstreet)..."
                  value={importUrl}
                  onChange={(e) => setImportUrl(e.target.value)}
                  className="flex-1 rounded-lg border border-zinc-800 bg-zinc-950 px-3.5 py-2 text-xs text-white placeholder-zinc-700 transition-all outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
                <button
                  type="button"
                  onClick={handleSimulateAiExtract}
                  disabled={isExtracting}
                  className="disabled:bg-indigo-650 flex cursor-pointer items-center gap-1.5 rounded-lg bg-indigo-600 px-3.5 py-2 text-xs font-semibold text-white shadow hover:bg-indigo-500 disabled:cursor-not-allowed"
                >
                  {isExtracting ? (
                    <>
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-3.5 w-3.5" />
                      Autofill Form
                    </>
                  )}
                </button>
              </div>
              {showAiAlert && (
                <div className="flex gap-2 rounded-lg border border-emerald-500/20 bg-emerald-500/10 p-2.5 text-xs text-emerald-400">
                  <Info className="mt-0.5 h-4 w-4 shrink-0" />
                  <p>
                    AI successfully populated the form below. Please review the
                    details before saving.
                  </p>
                </div>
              )}
            </div>

            {/* Form */}
            <form onSubmit={handleAddApplication} className="space-y-4 p-5">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-400">
                    Position / Job Title *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Frontend Developer"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    required
                    className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3.5 py-2 text-sm text-white placeholder-zinc-700 transition-all outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-400">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Google"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    required
                    className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3.5 py-2 text-sm text-white placeholder-zinc-700 transition-all outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-400">
                    Location
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Remote, San Francisco, CA"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3.5 py-2 text-sm text-white placeholder-zinc-700 transition-all outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-400">
                    Salary Range
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. $140k - $160k"
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                    className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3.5 py-2 text-sm text-white placeholder-zinc-700 transition-all outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-400">
                    Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) =>
                      setStatus(e.target.value as MockApplication['status'])
                    }
                    className="w-full cursor-pointer rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-white outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  >
                    <option value="Applied">Applied</option>
                    <option value="Screening">Screening</option>
                    <option value="Interviewing">Interviewing</option>
                    <option value="Technical Test">Technical Test</option>
                    <option value="HR Interview">HR Interview</option>
                    <option value="Offering">Offering</option>
                    <option value="Accepted">Accepted</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Withdrawn">Withdrawn</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-400">
                    Source Platform
                  </label>
                  <select
                    value={source}
                    onChange={(e) =>
                      setSource(e.target.value as MockApplication['source'])
                    }
                    className="w-full cursor-pointer rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-white outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  >
                    <option value="LinkedIn">LinkedIn</option>
                    <option value="Glints">Glints</option>
                    <option value="Jobstreet">Jobstreet</option>
                    <option value="Upwork">Upwork</option>
                    <option value="Indeed">Indeed</option>
                    <option value="Website">Company Website</option>
                    <option value="Instagram">Instagram</option>
                    <option value="X">X (Twitter)</option>
                    <option value="Other">Other / Referral</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-400">
                  Source Job URL
                </label>
                <input
                  type="url"
                  placeholder="https://example.com/job-post"
                  value={sourceUrl}
                  onChange={(e) => setSourceUrl(e.target.value)}
                  className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3.5 py-2 text-sm text-white placeholder-zinc-700 transition-all outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-400">
                  Job Description
                </label>
                <textarea
                  placeholder="Paste details of the responsibilities..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="w-full resize-y rounded-lg border border-zinc-800 bg-zinc-950 px-3.5 py-2 text-sm text-white placeholder-zinc-700 transition-all outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-400">
                  Requirements
                </label>
                <textarea
                  placeholder="Paste keys skills required..."
                  value={requirements}
                  onChange={(e) => setRequirements(e.target.value)}
                  rows={3}
                  className="w-full resize-y rounded-lg border border-zinc-800 bg-zinc-950 px-3.5 py-2 text-sm text-white placeholder-zinc-700 transition-all outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-400">
                  My Notes / Log
                </label>
                <textarea
                  placeholder="Interview questions, email copies, or diary notes..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={2}
                  className="w-full resize-y rounded-lg border border-zinc-800 bg-zinc-950 px-3.5 py-2 text-sm text-white placeholder-zinc-700 transition-all outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div className="flex justify-end gap-3 border-t border-zinc-800 pt-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="bg-zinc-850 cursor-pointer rounded-lg px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-zinc-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="cursor-pointer rounded-lg bg-indigo-600 px-4 py-2.5 text-xs font-semibold text-white shadow-md shadow-indigo-600/10 transition-all hover:bg-indigo-500 hover:shadow-indigo-600/20"
                >
                  Save Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Application Modal */}
      {isEditModalOpen && (
        <div className="animate-fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="animate-zoom-in max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl border border-zinc-800 bg-zinc-900 shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-zinc-800 p-5">
              <h2 className="flex items-center gap-2 text-xl font-bold text-white">
                <Briefcase className="h-5 w-5 text-indigo-400" />
                Edit Job Application
              </h2>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="cursor-pointer rounded-lg p-1 text-zinc-400 transition-colors hover:bg-zinc-800"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleUpdateApplication} className="space-y-4 p-5">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-400">
                    Position / Job Title *
                  </label>
                  <input
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    required
                    className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3.5 py-2 text-sm text-white placeholder-zinc-700 transition-all outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-400">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    required
                    className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3.5 py-2 text-sm text-white placeholder-zinc-700 transition-all outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-400">
                    Location
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3.5 py-2 text-sm text-white placeholder-zinc-700 transition-all outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-400">
                    Salary Range
                  </label>
                  <input
                    type="text"
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                    className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3.5 py-2 text-sm text-white placeholder-zinc-700 transition-all outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-400">
                    Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) =>
                      setStatus(e.target.value as MockApplication['status'])
                    }
                    className="w-full cursor-pointer rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-white outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  >
                    <option value="Applied">Applied</option>
                    <option value="Screening">Screening</option>
                    <option value="Interviewing">Interviewing</option>
                    <option value="Technical Test">Technical Test</option>
                    <option value="HR Interview">HR Interview</option>
                    <option value="Offering">Offering</option>
                    <option value="Accepted">Accepted</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Withdrawn">Withdrawn</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-400">
                    Source Platform
                  </label>
                  <select
                    value={source}
                    onChange={(e) =>
                      setSource(e.target.value as MockApplication['source'])
                    }
                    className="w-full cursor-pointer rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-white outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  >
                    <option value="LinkedIn">LinkedIn</option>
                    <option value="Glints">Glints</option>
                    <option value="Jobstreet">Jobstreet</option>
                    <option value="Upwork">Upwork</option>
                    <option value="Indeed">Indeed</option>
                    <option value="Website">Company Website</option>
                    <option value="Instagram">Instagram</option>
                    <option value="X">X (Twitter)</option>
                    <option value="Other">Other / Referral</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-400">
                  Source Job URL
                </label>
                <input
                  type="url"
                  value={sourceUrl}
                  onChange={(e) => setSourceUrl(e.target.value)}
                  className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3.5 py-2 text-sm text-white placeholder-zinc-700 transition-all outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-400">
                  Job Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="w-full resize-y rounded-lg border border-zinc-800 bg-zinc-950 px-3.5 py-2 text-sm text-white placeholder-zinc-700 transition-all outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-400">
                  Requirements
                </label>
                <textarea
                  value={requirements}
                  onChange={(e) => setRequirements(e.target.value)}
                  rows={3}
                  className="w-full resize-y rounded-lg border border-zinc-800 bg-zinc-950 px-3.5 py-2 text-sm text-white placeholder-zinc-700 transition-all outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-400">
                  My Notes / Log
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={2}
                  className="w-full resize-y rounded-lg border border-zinc-800 bg-zinc-950 px-3.5 py-2 text-sm text-white placeholder-zinc-700 transition-all outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div className="flex justify-end gap-3 border-t border-zinc-800 pt-3">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="bg-zinc-850 cursor-pointer rounded-lg px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-zinc-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="cursor-pointer rounded-lg bg-indigo-600 px-4 py-2.5 text-xs font-semibold text-white shadow-md shadow-indigo-600/10 transition-all hover:bg-indigo-500 hover:shadow-indigo-600/20"
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
