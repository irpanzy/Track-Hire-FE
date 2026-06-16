import { AlertTriangle, X, Loader2 } from 'lucide-react'
import type { DeletedUser } from '../types/adminType'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

interface ConfirmPermanentDeleteDialogProps {
  user: DeletedUser
  onConfirm: () => void
  onCancel: () => void
  isLoading: boolean
}

export default function ConfirmPermanentDeleteDialog({
  user,
  onConfirm,
  onCancel,
  isLoading,
}: ConfirmPermanentDeleteDialogProps) {
  return (
    <Dialog open={true} onOpenChange={onCancel}>
      <DialogContent className="max-w-md border-red-900/50" showCloseButton={false}>
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500/10">
                <AlertTriangle className="h-5 w-5 text-red-400" />
              </div>
              <div>
                <div className="text-lg font-bold">Permanently Delete User</div>
                <DialogDescription>
                  This action cannot be undone!
                </DialogDescription>
              </div>
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

        <div className="space-y-3 rounded-lg border border-red-900/30 bg-red-950/20 p-4">
          <p className="text-sm font-medium text-red-400">
            ⚠️ This will permanently delete:
          </p>
          <ul className="ml-4 space-y-1 text-sm text-zinc-400">
            <li>• User account</li>
            <li>• All applications</li>
            <li>• All reminders</li>
            <li>• Application history</li>
            <li>• Verification tokens</li>
            <li>• Avatar from storage</li>
          </ul>
        </div>

        <div className="space-y-2 rounded-lg border border-zinc-800 bg-zinc-950 p-4">
          <p className="text-sm text-zinc-400">
            <span className="font-medium text-white">Name:</span> {user.name}
          </p>
          <p className="text-sm text-zinc-400">
            <span className="font-medium text-white">Email:</span> {user.email}
          </p>
          <p className="text-sm text-zinc-400">
            <span className="font-medium text-white">Username:</span> @
            {user.username}
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
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <AlertTriangle className="h-4 w-4 mr-2" />
                Delete Permanently
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
