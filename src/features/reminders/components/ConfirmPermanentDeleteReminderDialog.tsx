import { AlertTriangle, Loader2, X } from 'lucide-react'
import type { Reminder } from '../types/reminderType'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

interface ConfirmPermanentDeleteReminderDialogProps {
  reminder: Reminder
  onConfirm: () => void
  onCancel: () => void
  isLoading: boolean
}

export default function ConfirmPermanentDeleteReminderDialog({
  reminder,
  onConfirm,
  onCancel,
  isLoading,
}: ConfirmPermanentDeleteReminderDialogProps) {
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
              <div className="text-lg font-bold text-red-400">
                Permanent Delete
              </div>
              <DialogDescription className="text-zinc-500">
                ⚠️ This action cannot be undone!
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

        <div className="space-y-4">
          <div className="space-y-2 rounded-lg border border-red-900/50 bg-red-950/20 p-4">
            <p className="text-sm text-zinc-400">
              <span className="font-medium text-white">Reminder:</span>{' '}
              {reminder.title}
            </p>
            {reminder.application && (
              <p className="text-sm text-zinc-400">
                <span className="font-medium text-white">Linked to:</span>{' '}
                {reminder.application.position} @{' '}
                {reminder.application.company.name}
              </p>
            )}
          </div>

          <div className="rounded-lg border border-yellow-900/50 bg-yellow-950/20 p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 flex-shrink-0 text-yellow-400" />
              <div className="text-sm text-yellow-200">
                <p className="font-medium">Warning:</p>
                <p className="mt-1 text-yellow-300/80">
                  This will permanently remove this reminder from the database.
                  This action cannot be undone.
                </p>
              </div>
            </div>
          </div>
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
                Delete Forever
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
