import {
  X,
  Loader2,
  Building2,
  Globe,
  MapPin,
  Briefcase,
  Edit2,
  Trash2,
  ExternalLink,
} from 'lucide-react'
import { useCompany } from '../hooks/useCompanies'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface CompanyDetailDialogProps {
  companyId: string
  onClose: () => void
  onEdit: () => void
  onDelete: () => void
}

export default function CompanyDetailDialog({
  companyId,
  onClose,
  onEdit,
  onDelete,
}: CompanyDetailDialogProps) {
  const { data, isLoading } = useCompany(companyId)

  const company = data?.company

  if (isLoading) {
    return (
      <Dialog open={true} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl" showCloseButton={false}>
          <div className="flex h-32 items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-indigo-400" />
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  if (!company) {
    return null
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto" showCloseButton={false}>
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div className="flex-1">
              <h2 className="text-2xl font-bold">{company.name}</h2>
              {company.location && (
                <div className="mt-1 flex items-center gap-2 text-sm text-zinc-400">
                  <MapPin className="h-4 w-4" />
                  <span>{company.location}</span>
                </div>
              )}
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
          {/* Company Info */}
          <div className="space-y-3 rounded-xl border border-zinc-800 bg-zinc-950 p-4">
            <h3 className="flex items-center gap-2 text-sm font-semibold text-white">
              <Building2 className="h-4 w-4 text-indigo-400" />
              Company Information
            </h3>
            <div className="space-y-2 text-sm">
              <p className="text-zinc-400">
                <span className="font-medium text-white">Name:</span>{' '}
                {company.name}
              </p>
              {company.website && (
                <p className="text-zinc-400">
                  <span className="font-medium text-white">Website:</span>{' '}
                  <a
                    href={company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-400 hover:underline"
                  >
                    {company.website}
                  </a>
                </p>
              )}
              {company.location && (
                <p className="text-zinc-400">
                  <span className="font-medium text-white">Location:</span>{' '}
                  {company.location}
                </p>
              )}
            </div>
          </div>

          {/* Applications at this company */}
          {company.applications && company.applications.length > 0 && (
            <div className="space-y-3 rounded-xl border border-zinc-800 bg-zinc-950 p-4">
              <h3 className="flex items-center gap-2 text-sm font-semibold text-white">
                <Briefcase className="h-4 w-4 text-indigo-400" />
                Your Applications ({company.applications.length})
              </h3>
              <div className="space-y-2">
                {company.applications.map((app) => (
                  <div
                    key={app.id}
                    className="flex items-center justify-between rounded-lg border border-zinc-800 bg-zinc-900 p-3"
                  >
                    <div>
                      <p className="text-sm font-medium text-white">
                        {app.position}
                      </p>
                      <p className="text-xs text-zinc-500">
                        {app.jobType.replace('_', ' ')} • Applied{' '}
                        {new Date(app.appliedDate).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge variant="outline">{app.status}</Badge>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Visit Website */}
          {company.website && (
            <div className="flex justify-center">
              <Button variant="outline" asChild>
                <a
                  href={company.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <Globe className="h-4 w-4" />
                  Visit Website
                  <ExternalLink className="h-3 w-3" />
                </a>
              </Button>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex justify-end gap-3 border-t border-zinc-800 pt-4 -mx-4 -mb-4 p-4 bg-muted/50 rounded-b-xl">
          <Button
            variant="outline"
            onClick={onDelete}
            className="border-red-500/20 text-red-400 hover:bg-red-500/10"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
          <Button onClick={onEdit}>
            <Edit2 className="h-4 w-4 mr-2" />
            Edit Company
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
