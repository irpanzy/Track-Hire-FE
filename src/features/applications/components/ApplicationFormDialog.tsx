import { useState } from 'react'
import { X, Sparkles, Loader2, Info, Save } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useApplicationMutations } from '../hooks/useApplicationMutations'
import {
  createApplicationSchema,
  type CreateApplicationFormValues,
} from '../schemas/applicationSchema'
import {
  JOB_TYPE_OPTIONS,
  APPLICATION_SOURCE_OPTIONS,
  APPLICATION_STATUS_OPTIONS,
} from '../constants/applicationConstants'
import type { Application } from '../types/applicationType'

interface ApplicationFormDialogProps {
  application: Application | null
  onClose: () => void
}

export default function ApplicationFormDialog({
  application,
  onClose,
}: ApplicationFormDialogProps) {
  const isEditMode = !!application
  const { createApplication, updateApplication, extractUrl } =
    useApplicationMutations()

  const [extractUrlInput, setExtractUrlInput] = useState('')
  const [showAiAlert, setShowAiAlert] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CreateApplicationFormValues>({
    resolver: zodResolver(createApplicationSchema),
    defaultValues: isEditMode
      ? {
          companyName: application.company.name,
          companyWebsite: application.company.website || '',
          companyLocation: application.company.location || '',
          position: application.position,
          jobType: application.jobType,
          location: application.location || '',
          source: application.source,
          sourceUrl: application.sourceUrl || '',
          description: application.description || '',
          requirements: application.requirements || '',
          salaryRange: application.salaryRange || '',
          status: application.status,
          appliedDate: application.appliedDate?.split('T')[0] || '',
          deadlineDate: application.deadlineDate?.split('T')[0] || '',
          notes: application.notes || '',
        }
      : {
          status: 'APPLIED',
        },
  })

  const handleExtractUrl = async () => {
    if (!extractUrlInput.trim()) {
      return
    }

    extractUrl.mutate(
      { url: extractUrlInput },
      {
        onSuccess: (data) => {
          // Auto-fill form with extracted data
          const extracted = data.data
          setValue('companyName', extracted.companyName)
          setValue('companyWebsite', extracted.companyWebsite || '')
          setValue('companyLocation', extracted.companyLocation || '')
          setValue('position', extracted.position)
          setValue('jobType', extracted.jobType)
          setValue('location', extracted.location || '')
          setValue('source', extracted.source)
          setValue('sourceUrl', extracted.sourceUrl)
          setValue('description', extracted.description || '')
          setValue('requirements', extracted.requirements || '')
          setValue('salaryRange', extracted.salaryRange || '')
          setValue('deadlineDate', extracted.deadlineDate?.split('T')[0] || '')
          setShowAiAlert(true)
        },
      }
    )
  }

  const onSubmit = (data: CreateApplicationFormValues) => {
    // Clean empty strings
    const payload = Object.entries(data).reduce((acc, [key, value]) => {
      if (value !== '') {
        acc[key] = value
      }
      return acc
    }, {} as any)

    if (isEditMode) {
      updateApplication.mutate(
        { id: application.id, payload },
        {
          onSuccess: () => {
            onClose()
          },
        }
      )
    } else {
      createApplication.mutate(payload, {
        onSuccess: () => {
          onClose()
        },
      })
    }
  }

  const isMutating =
    createApplication.isPending ||
    updateApplication.isPending ||
    extractUrl.isPending

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-xl border border-zinc-800 bg-zinc-900 shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-zinc-800 bg-zinc-900 p-5">
          <h2 className="text-xl font-bold text-white">
            {isEditMode ? 'Edit Application' : 'Add New Application'}
          </h2>
          <button
            onClick={onClose}
            disabled={isMutating}
            className="rounded-lg p-1 text-zinc-500 transition-colors hover:bg-zinc-800 hover:text-white disabled:cursor-not-allowed"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* AI URL Extraction Section */}
        {!isEditMode && (
          <div className="space-y-3 border-b border-zinc-800 bg-indigo-950/20 p-5">
            <label className="flex items-center gap-1.5 text-xs font-semibold text-indigo-300">
              <Sparkles className="h-4 w-4 text-indigo-400" />
              AI Job Details Extractor (Auto-fill from URL)
            </label>
            <div className="flex gap-2">
              <input
                type="url"
                placeholder="Paste job posting URL (LinkedIn, Glints, etc.)..."
                value={extractUrlInput}
                onChange={(e) => setExtractUrlInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleExtractUrl()}
                disabled={extractUrl.isPending}
                className="flex-1 rounded-lg border border-zinc-800 bg-zinc-950 px-3.5 py-2 text-sm text-white placeholder-zinc-500 transition-all outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
              />
              <button
                type="button"
                onClick={handleExtractUrl}
                disabled={extractUrl.isPending || !extractUrlInput.trim()}
                className="flex items-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-indigo-500 disabled:cursor-not-allowed disabled:bg-indigo-700"
              >
                {extractUrl.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Extracting...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    Extract
                  </>
                )}
              </button>
            </div>
            {showAiAlert && (
              <div className="flex gap-2 rounded-lg border border-emerald-500/20 bg-emerald-500/10 p-3 text-xs text-emerald-400">
                <Info className="mt-0.5 h-4 w-4 shrink-0" />
                <p>
                  AI successfully populated the form. Please review before
                  saving.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 p-5">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-zinc-300">
              Company Information
            </h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-zinc-400">
                  Company Name *
                </label>
                <input
                  {...register('companyName')}
                  placeholder="e.g. Google"
                  className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3.5 py-2 text-sm text-white placeholder-zinc-500 transition-all outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
                {errors.companyName && (
                  <p className="text-xs text-red-400">
                    {errors.companyName.message}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-zinc-400">
                  Company Website
                </label>
                <input
                  {...register('companyWebsite')}
                  type="url"
                  placeholder="https://example.com"
                  className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3.5 py-2 text-sm text-white placeholder-zinc-500 transition-all outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
                {errors.companyWebsite && (
                  <p className="text-xs text-red-400">
                    {errors.companyWebsite.message}
                  </p>
                )}
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-medium text-zinc-400">
                  Company Location
                </label>
                <input
                  {...register('companyLocation')}
                  placeholder="e.g. Jakarta, Indonesia"
                  className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3.5 py-2 text-sm text-white placeholder-zinc-500 transition-all outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
                {errors.companyLocation && (
                  <p className="text-xs text-red-400">
                    {errors.companyLocation.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Job Details */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-zinc-300">Job Details</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-medium text-zinc-400">
                  Position *
                </label>
                <input
                  {...register('position')}
                  placeholder="e.g. Frontend Developer"
                  className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3.5 py-2 text-sm text-white placeholder-zinc-500 transition-all outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
                {errors.position && (
                  <p className="text-xs text-red-400">
                    {errors.position.message}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-zinc-400">
                  Job Type *
                </label>
                <select
                  {...register('jobType')}
                  className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3.5 py-2 text-sm text-white transition-all outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                >
                  {JOB_TYPE_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                {errors.jobType && (
                  <p className="text-xs text-red-400">
                    {errors.jobType.message}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-zinc-400">
                  Location
                </label>
                <input
                  {...register('location')}
                  placeholder="e.g. Remote, Jakarta"
                  className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3.5 py-2 text-sm text-white placeholder-zinc-500 transition-all outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-zinc-400">
                  Source *
                </label>
                <select
                  {...register('source')}
                  className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3.5 py-2 text-sm text-white transition-all outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                >
                  {APPLICATION_SOURCE_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                {errors.source && (
                  <p className="text-xs text-red-400">
                    {errors.source.message}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-zinc-400">
                  Source URL
                </label>
                <input
                  {...register('sourceUrl')}
                  type="url"
                  placeholder="https://..."
                  className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3.5 py-2 text-sm text-white placeholder-zinc-500 transition-all outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-zinc-400">
                  Salary Range
                </label>
                <input
                  {...register('salaryRange')}
                  placeholder="e.g. $100k - $150k"
                  className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3.5 py-2 text-sm text-white placeholder-zinc-500 transition-all outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-zinc-400">
                  Status
                </label>
                <select
                  {...register('status')}
                  className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3.5 py-2 text-sm text-white transition-all outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                >
                  {APPLICATION_STATUS_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-zinc-400">
                  Applied Date
                </label>
                <input
                  {...register('appliedDate')}
                  type="date"
                  className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3.5 py-2 text-sm text-white transition-all outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-zinc-400">
                  Deadline Date
                </label>
                <input
                  {...register('deadlineDate')}
                  type="date"
                  className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3.5 py-2 text-sm text-white transition-all outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-medium text-zinc-400">
                  Description
                </label>
                <textarea
                  {...register('description')}
                  rows={3}
                  placeholder="Job description..."
                  className="w-full resize-y rounded-lg border border-zinc-800 bg-zinc-950 px-3.5 py-2 text-sm text-white placeholder-zinc-500 transition-all outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-medium text-zinc-400">
                  Requirements
                </label>
                <textarea
                  {...register('requirements')}
                  rows={3}
                  placeholder="Job requirements..."
                  className="w-full resize-y rounded-lg border border-zinc-800 bg-zinc-950 px-3.5 py-2 text-sm text-white placeholder-zinc-500 transition-all outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-medium text-zinc-400">
                  Notes
                </label>
                <textarea
                  {...register('notes')}
                  rows={2}
                  placeholder="Personal notes..."
                  className="w-full resize-y rounded-lg border border-zinc-800 bg-zinc-950 px-3.5 py-2 text-sm text-white placeholder-zinc-500 transition-all outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 border-t border-zinc-800 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isMutating}
              className="rounded-lg border border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isMutating}
              className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-indigo-500 disabled:cursor-not-allowed disabled:bg-indigo-700"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  {isEditMode ? 'Update' : 'Save'} Application
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
