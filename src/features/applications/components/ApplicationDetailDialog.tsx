import {
  X,
  Loader2,
  Building2,
  MapPin,
  DollarSign,
  Calendar,
  ExternalLink,
  Pencil,
  Trash2,
  Clock,
  FileText,
  CheckCircle,
} from 'lucide-react'
import { useApplication } from '../hooks/useApplications'
import { STATUS_COLORS } from '../constants/applicationConstants'
import { cn } from '@/lib/utils'

interface ApplicationDetailDialogProps {
  applicationId: string
  onClose: () => void
  onEdit: () => void
  onDelete: () => void
}

export default function ApplicationDetailDialog({
  applicationId,
  onClose,
  onEdit,
  onDelete,
}: ApplicationDetailDialogProps) {
  const { data, isLoading } = useApplication(applicationId)

  const application = data?.application

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
        <div className="flex h-48 w-full max-w-3xl items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900">
          <Loader2 className="h-8 w-8 animate-spin text-indigo-400" />
        </div>
      </div>
    )
  }

  if (!application) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-xl border border-zinc-800 bg-zinc-900 shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-zinc-800 bg-zinc-900 p-6">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-white">
              {application.position}
            </h2>
            <div className="mt-1 flex items-center gap-2 text-sm text-zinc-400">
              <Building2 className="h-4 w-4" />
              <span>{application.company.name}</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-zinc-500 transition-colors hover:bg-zinc-800 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-6 p-6">
          {/* Status Badge */}
          <div className="flex items-center gap-3">
            <span
              className={cn(
                'inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold ring-1',
                STATUS_COLORS[application.status]
              )}
            >
              <CheckCircle className="h-4 w-4" />
              {application.status}
            </span>
            <span className="text-sm text-zinc-500">
              {application.jobType.replace('_', ' ')}
            </span>
          </div>

          {/* Quick Info Grid */}
          <div className="grid grid-cols-1 gap-4 rounded-xl border border-zinc-800 bg-zinc-950 p-4 md:grid-cols-2">
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-zinc-500" />
              <div>
                <p className="text-xs font-medium text-zinc-500">Location</p>
                <p className="text-sm text-white">
                  {application.location ||
                    application.company.location ||
                    'Not specified'}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <DollarSign className="mt-0.5 h-5 w-5 shrink-0 text-zinc-500" />
              <div>
                <p className="text-xs font-medium text-zinc-500">
                  Salary Range
                </p>
                <p className="text-sm text-white">
                  {application.salaryRange || 'Not specified'}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Calendar className="mt-0.5 h-5 w-5 shrink-0 text-zinc-500" />
              <div>
                <p className="text-xs font-medium text-zinc-500">
                  Applied Date
                </p>
                <p className="text-sm text-white">
                  {new Date(application.appliedDate).toLocaleDateString(
                    'en-US',
                    {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    }
                  )}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="mt-0.5 h-5 w-5 shrink-0 text-zinc-500" />
              <div>
                <p className="text-xs font-medium text-zinc-500">Deadline</p>
                <p className="text-sm text-white">
                  {application.deadlineDate
                    ? new Date(application.deadlineDate).toLocaleDateString(
                        'en-US',
                        {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        }
                      )
                    : 'No deadline'}
                </p>
              </div>
            </div>
          </div>

          {/* Company Info */}
          <div className="space-y-3 rounded-xl border border-zinc-800 bg-zinc-950 p-4">
            <h3 className="flex items-center gap-2 text-sm font-semibold text-white">
              <Building2 className="h-4 w-4 text-indigo-400" />
              Company Information
            </h3>
            <div className="space-y-2 text-sm">
              <p className="text-zinc-400">
                <span className="font-medium text-white">Name:</span>{' '}
                {application.company.name}
              </p>
              {application.company.website && (
                <p className="text-zinc-400">
                  <span className="font-medium text-white">Website:</span>{' '}
                  <a
                    href={application.company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-400 hover:underline"
                  >
                    {application.company.website}
                  </a>
                </p>
              )}
              {application.company.location && (
                <p className="text-zinc-400">
                  <span className="font-medium text-white">Location:</span>{' '}
                  {application.company.location}
                </p>
              )}
            </div>
          </div>

          {/* Description */}
          {application.description && (
            <div className="space-y-3 rounded-xl border border-zinc-800 bg-zinc-950 p-4">
              <h3 className="flex items-center gap-2 text-sm font-semibold text-white">
                <FileText className="h-4 w-4 text-indigo-400" />
                Job Description
              </h3>
              <p className="text-sm whitespace-pre-wrap text-zinc-400">
                {application.description}
              </p>
            </div>
          )}

          {/* Requirements */}
          {application.requirements && (
            <div className="space-y-3 rounded-xl border border-zinc-800 bg-zinc-950 p-4">
              <h3 className="flex items-center gap-2 text-sm font-semibold text-white">
                <CheckCircle className="h-4 w-4 text-indigo-400" />
                Requirements
              </h3>
              <p className="text-sm whitespace-pre-wrap text-zinc-400">
                {application.requirements}
              </p>
            </div>
          )}

          {/* Notes */}
          {application.notes && (
            <div className="space-y-3 rounded-xl border border-zinc-800 bg-zinc-950 p-4">
              <h3 className="flex items-center gap-2 text-sm font-semibold text-white">
                <FileText className="h-4 w-4 text-indigo-400" />
                My Notes
              </h3>
              <p className="text-sm whitespace-pre-wrap text-zinc-400">
                {application.notes}
              </p>
            </div>
          )}

          {/* History Timeline */}
          {application.histories && application.histories.length > 0 && (
            <div className="space-y-3 rounded-xl border border-zinc-800 bg-zinc-950 p-4">
              <h3 className="flex items-center gap-2 text-sm font-semibold text-white">
                <Clock className="h-4 w-4 text-indigo-400" />
                Status History
              </h3>
              <div className="space-y-3">
                {application.histories.map((history, index) => (
                  <div key={history.id} className="relative flex gap-3 pl-6">
                    {/* Timeline line */}
                    {index < application.histories!.length - 1 && (
                      <div className="absolute top-6 left-2 h-full w-px bg-zinc-800" />
                    )}

                    {/* Timeline dot */}
                    <div className="absolute top-1.5 left-0 h-4 w-4 rounded-full border-2 border-zinc-800 bg-indigo-500" />

                    <div className="flex-1 pb-3">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-sm font-medium text-white">
                            {history.oldStatus ? (
                              <>
                                Changed from{' '}
                                <span className="text-zinc-400">
                                  {history.oldStatus}
                                </span>{' '}
                                to{' '}
                                <span className="text-indigo-400">
                                  {history.newStatus}
                                </span>
                              </>
                            ) : (
                              <>
                                Application created as{' '}
                                <span className="text-indigo-400">
                                  {history.newStatus}
                                </span>
                              </>
                            )}
                          </p>
                          {history.notes && (
                            <p className="mt-1 text-xs text-zinc-500">
                              {history.notes}
                            </p>
                          )}
                        </div>
                        <span className="shrink-0 text-xs text-zinc-500">
                          {new Date(history.createdAt).toLocaleDateString(
                            'en-US',
                            {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            }
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Source Link */}
          {application.sourceUrl && (
            <div className="flex justify-center">
              <a
                href={application.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg border border-zinc-800 px-4 py-2 text-sm font-medium text-zinc-400 transition-colors hover:border-indigo-500 hover:bg-zinc-800 hover:text-indigo-400"
              >
                <ExternalLink className="h-4 w-4" />
                View Original Job Posting
              </a>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="sticky bottom-0 flex justify-end gap-3 border-t border-zinc-800 bg-zinc-900 p-6">
          <button
            onClick={onDelete}
            className="flex items-center gap-2 rounded-lg border border-red-500/20 px-4 py-2 text-sm font-medium text-red-400 transition-colors hover:bg-red-500/10"
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </button>
          <button
            onClick={onEdit}
            className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-indigo-500"
          >
            <Pencil className="h-4 w-4" />
            Edit Application
          </button>
        </div>
      </div>
    </div>
  )
}
