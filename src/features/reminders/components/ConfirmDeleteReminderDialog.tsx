import { AlertTriangle, X, Loader2 } from 'lucide-react'
import type { Reminder } from '../types/reminderType'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

interface ConfirmDeleteReminderDialogProps {
  reminder: Reminder
  onConfirm: () => void
  onCancel: () => void
  isLoading: boolean
}

export default function ConfirmDeleteReminderDialog({
  reminder,
  onConfirm,
  onCancel,
  isLoading,
}: ConfirmDeleteReminderDialogProps) {
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
              <div className="text-lg font-bold">Delete Reminder</div>
              <DialogDescription className="text-zinc-500">
                Moved to recycle bin
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
