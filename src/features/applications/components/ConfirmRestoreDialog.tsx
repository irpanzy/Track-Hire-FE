import { RefreshCw, Loader2, X } from 'lucide-react'
import type { Application } from '../types/applicationType'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { STATUS_COLORS, STATUS_LABELS } from '../constants/applicationConstants'

interface ConfirmRestoreDialogProps {
  application: Application
  onConfirm: () => void
  onCancel: () => void
  isLoading: boolean
}

export default function ConfirmRestoreDialog({
  application,
  onConfirm,
  onCancel,
  isLoading,
}: ConfirmRestoreDialogProps) {
  return (
    <Dialog open={true} onOpenChange={onCancel}>
      <DialogContent className="max-w-md border-green-900/50" showCloseButton={false}>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500/10">
              <RefreshCw className="h-5 w-5 text-green-400" />
            </div>
            <div>
              <div className="text-lg font-bold">Restore Application</div>
              <DialogDescription className="text-zinc-500">
                This application will be restored
              </DialogDescription>
            </div>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={onCancel}
              disabled={isLoading}
              className="absolute top-2 right-2"
            >
              <X className="h-5 w-5" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-2 rounded-lg border border-zinc-800 bg-zinc-950 p-4">
          <p className="text-sm text-zinc-400">
            <span className="font-medium text-white">Position:</span>{' '}
            {application.position}
          </p>
          <p className="text-sm text-zinc-400">
            <span className="font-medium text-white">Company:</span>{' '}
            {application.company.name}
          </p>
          <div className="flex items-center gap-2 text-sm text-zinc-400">
            <span className="font-medium text-white">Status:</span>
            <Badge
              variant="outline"
              className={`${STATUS_COLORS[application.status]} border-0`}
            >
              {STATUS_LABELS[application.status]}
            </Badge>
          </div>
          {application.deletedAt && (
            <p className="text-sm text-zinc-400">
              <span className="font-medium text-white">Deleted At:</span>{' '}
              {new Date(application.deletedAt).toLocaleString()}
            </p>
          )}
        </div>

        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={onCancel}
            disabled={isLoading}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            disabled={isLoading}
            className="flex-1 bg-green-600 hover:bg-green-500"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Restoring...
              </>
            ) : (
              <>
                <RefreshCw className="h-4 w-4 mr-2" />
                Restore
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
