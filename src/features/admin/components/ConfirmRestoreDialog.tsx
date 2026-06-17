import { RefreshCw, X, Loader2 } from 'lucide-react'
import type { DeletedUser } from '../types/adminType'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

interface ConfirmRestoreDialogProps {
  user: DeletedUser
  onConfirm: () => void
  onCancel: () => void
  isLoading: boolean
}

export default function ConfirmRestoreDialog({
  user,
  onConfirm,
  onCancel,
  isLoading,
}: ConfirmRestoreDialogProps) {
  return (
    <Dialog open={true} onOpenChange={onCancel}>
      <DialogContent className="max-w-md" showCloseButton={false}>
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/10">
                <RefreshCw className="h-5 w-5 text-emerald-400" />
              </div>
              <div>
                <div className="text-lg font-bold">Restore User</div>
                <DialogDescription>
                  This action will restore the user account
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
            onClick={onConfirm}
            disabled={isLoading}
            className="flex-1 bg-emerald-600 hover:bg-emerald-500"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Restoring...
              </>
            ) : (
              <>
                <RefreshCw className="mr-2 h-4 w-4" />
                Restore User
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
