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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

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
      <Dialog open={true} onOpenChange={onClose}>
        <DialogContent className="max-w-3xl" showCloseButton={false}>
          <div className="flex h-32 items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-indigo-400" />
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  if (!application) {
    return null
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent
        className="max-h-[90vh] max-w-4xl overflow-y-auto"
        showCloseButton={false}
      >
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div className="flex-1">
              <h2 className="text-2xl font-bold">{application.position}</h2>
              <div className="mt-1 flex items-center gap-2 text-sm text-zinc-400">
                <Building2 className="h-4 w-4" />
                <span>{application.company.name}</span>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={onClose}
              className="absolute top-2 right-2"
            >
              <X className="h-5 w-5" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        {/* Content */}
        <div className="space-y-6">
          {/* Status Badge */}
          <div className="flex items-center gap-3">
            <Badge
              className={cn(
                'inline-flex items-center gap-1.5',
                STATUS_COLORS[application.status]
              )}
            >
              <CheckCircle className="h-4 w-4" />
              {application.status}
            </Badge>
            <span className="text-sm text-zinc-500">
              {application.jobType.replace('_', ' ')}
            </span>
          </div>

          {/* Quick Info Grid */}
          <div className="grid grid-cols-1 gap-4 rounded-xl border border-white/[0.08] bg-white/[0.03] p-4 backdrop-blur-md md:grid-cols-2">
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
          <div className="space-y-3 rounded-xl border border-white/[0.08] bg-white/[0.03] p-4 backdrop-blur-md">
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
            <div className="space-y-3 rounded-xl border border-white/[0.08] bg-white/[0.03] p-4 backdrop-blur-md">
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
            <div className="space-y-3 rounded-xl border border-white/[0.08] bg-white/[0.03] p-4 backdrop-blur-md">
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
            <div className="space-y-3 rounded-xl border border-white/[0.08] bg-white/[0.03] p-4 backdrop-blur-md">
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
            <div className="space-y-3 rounded-xl border border-white/[0.08] bg-white/[0.03] p-4 backdrop-blur-md">
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
              <Button variant="outline" asChild>
                <a
                  href={application.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <ExternalLink className="h-4 w-4" />
                  View Original Job Posting
                </a>
              </Button>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="-mx-4 -mb-4 flex justify-end gap-3 rounded-b-xl border-t border-white/[0.08] bg-white/[0.02] p-4 pt-4 backdrop-blur-md">
          <Button
            variant="outline"
            onClick={onDelete}
            className="border-red-500/20 text-red-400 hover:bg-red-500/10"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>
          <Button onClick={onEdit}>
            <Pencil className="mr-2 h-4 w-4" />
            Edit Application
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
