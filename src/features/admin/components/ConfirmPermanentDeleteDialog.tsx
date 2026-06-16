import { AlertTriangle, X, Loader2 } from 'lucide-react'
import type { DeletedUser } from '../types/adminType'

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md space-y-4 rounded-xl border border-red-900/50 bg-zinc-900 p-6 shadow-2xl">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500/10">
              <AlertTriangle className="h-5 w-5 text-red-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">
                Permanently Delete User
              </h3>
              <p className="text-sm text-zinc-500">
                This action cannot be undone!
              </p>
            </div>
          </div>
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="rounded-lg p-1 text-zinc-500 transition-colors hover:bg-zinc-800 hover:text-white disabled:cursor-not-allowed"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

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
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="flex-1 rounded-lg border border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-500 disabled:cursor-not-allowed disabled:bg-red-700"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <AlertTriangle className="h-4 w-4" />
                Delete Permanently
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
