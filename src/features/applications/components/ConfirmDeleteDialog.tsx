import { AlertTriangle, X, Loader2 } from 'lucide-react'
import type { Application } from '../types/applicationType'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

interface ConfirmDeleteDialogProps {
  application: Application
  onConfirm: () => void
  onCancel: () => void
  isLoading: boolean
}

export default function ConfirmDeleteDialog({
  application,
  onConfirm,
  onCancel,
  isLoading,
}: ConfirmDeleteDialogProps) {
  return (
    <Dialog open={true} onOpenChange={onCancel}>
      <DialogContent
        className="max-w-md border-red-900/50"
        showCloseButton={false}
      >
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500/10">
              <AlertTriangle className="h-5 w-5 text-red-400" />
            </div>
            <div>
              <div className="text-lg font-bold">Delete Application</div>
              <DialogDescription className="text-zinc-500">
                This action cannot be undone
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
            variant="destructive"
            onClick={onConfirm}
            disabled={isLoading}
            className="flex-1"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <AlertTriangle className="mr-2 h-4 w-4" />
                Delete
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
