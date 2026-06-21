import { RefreshCw, Loader2, X } from 'lucide-react'
import type { Company } from '../types/companyType'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

interface ConfirmRestoreDialogProps {
  company: Company
  onConfirm: () => void
  onCancel: () => void
  isLoading: boolean
}

export default function ConfirmRestoreDialog({
  company,
  onConfirm,
  onCancel,
  isLoading,
}: ConfirmRestoreDialogProps) {
  return (
    <Dialog open={true} onOpenChange={onCancel}>
      <DialogContent
        className="max-w-md border-green-900/50"
        showCloseButton={false}
      >
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500/10">
              <RefreshCw className="h-5 w-5 text-green-400" />
            </div>
            <div>
              <div className="text-lg font-bold">Restore Company</div>
              <DialogDescription className="text-zinc-500">
                This company will be restored
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

        <div className="space-y-2 rounded-lg border border-white/[0.08] bg-white/[0.03] p-4 backdrop-blur-md">
          <p className="text-sm text-zinc-400">
            <span className="font-medium text-white">Company:</span>{' '}
            {company.name}
          </p>
          {company.location && (
            <p className="text-sm text-zinc-400">
              <span className="font-medium text-white">Location:</span>{' '}
              {company.location}
            </p>
          )}
          {company.deletedAt && (
            <p className="text-sm text-zinc-400">
              <span className="font-medium text-white">Deleted At:</span>{' '}
              {new Date(company.deletedAt).toLocaleString()}
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
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Restoring...
              </>
            ) : (
              <>
                <RefreshCw className="mr-2 h-4 w-4" />
                Restore
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
