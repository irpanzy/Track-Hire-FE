import { AlertTriangle, Loader2, Trash2 } from 'lucide-react'
import type { AdminUser } from '../types/adminType'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

interface ConfirmDeleteDialogProps {
  user: AdminUser
  onConfirm: () => void
  onCancel: () => void
  isLoading: boolean
}

export default function ConfirmDeleteDialog({
  user,
  onConfirm,
  onCancel,
  isLoading,
}: ConfirmDeleteDialogProps) {
  return (
    <Dialog open={true} onOpenChange={onCancel}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500/15">
              <AlertTriangle className="h-5 w-5 text-red-400" />
            </div>
            <div>
              <div className="text-base font-semibold">Delete User</div>
              <DialogDescription>
                This action cannot be undone
              </DialogDescription>
            </div>
          </DialogTitle>
        </DialogHeader>
        
        <p className="text-sm text-zinc-400">
          Are you sure you want to delete{' '}
          <span className="font-semibold text-white">{user.name}</span>{' '}
          <span className="text-zinc-500">(@{user.username})</span>? The user
          will be soft-deleted and will no longer have access.
        </p>
        
        <div className="flex items-center justify-end gap-3">
          <Button
            variant="outline"
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Deleting…
              </>
            ) : (
              <>
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
