import { RefreshCw, X, Loader2 } from 'lucide-react'
import type { DeletedUser } from '../types/adminType'

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md space-y-4 rounded-xl border border-zinc-800 bg-zinc-900 p-6 shadow-2xl">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/10">
              <RefreshCw className="h-5 w-5 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Restore User</h3>
              <p className="text-sm text-zinc-500">
                This action will restore the user account
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
            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-emerald-500 disabled:cursor-not-allowed disabled:bg-emerald-700"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Restoring...
              </>
            ) : (
              <>
                <RefreshCw className="h-4 w-4" />
                Restore User
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
