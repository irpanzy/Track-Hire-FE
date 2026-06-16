import { AlertTriangle, Loader2, Trash2 } from 'lucide-react'
import type { AdminUser } from '../types/adminType'

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onCancel}
      />
      {/* Dialog */}
      <div className="relative w-full max-w-md rounded-xl border border-zinc-800 bg-zinc-900 p-6 shadow-2xl">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500/15">
            <AlertTriangle className="h-5 w-5 text-red-400" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-white">Delete User</h3>
            <p className="text-xs text-zinc-500">
              This action cannot be undone
            </p>
          </div>
        </div>
        <p className="mb-6 text-sm text-zinc-400">
          Are you sure you want to delete{' '}
          <span className="font-semibold text-white">{user.name}</span>{' '}
          <span className="text-zinc-500">(@{user.username})</span>? The user
          will be soft-deleted and will no longer have access.
        </p>
        <div className="flex items-center justify-end gap-3">
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="rounded-lg border border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-300 transition-colors hover:bg-zinc-800 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-500 disabled:opacity-60"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Deleting…
              </>
            ) : (
              <>
                <Trash2 className="h-4 w-4" />
                Delete
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
