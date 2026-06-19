import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Building2, Loader2, Save, X } from 'lucide-react'
import { useCompanyMutations } from '../hooks/useCompanyMutations'
import {
  createCompanySchema,
  type CreateCompanyFormValues,
} from '../schemas/companySchema'
import type { Company } from '../types/companyType'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { RetroLoading } from '@/components/ui/retro-window'

interface CompanyFormDialogProps {
  company: Company | null
  onClose: () => void
}

export default function CompanyFormDialog({
  company,
  onClose,
}: CompanyFormDialogProps) {
  const isEditMode = !!company
  const { createCompany, updateCompany } = useCompanyMutations()
  const [isComplete, setIsComplete] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateCompanyFormValues>({
    resolver: zodResolver(createCompanySchema),
    defaultValues: isEditMode
      ? {
          name: company.name,
          website: company.website || '',
          location: company.location || '',
        }
      : {
          name: '',
          website: '',
          location: '',
        },
  })

  const onSubmit = (data: CreateCompanyFormValues) => {
    // Clean empty strings
    const payload = Object.entries(data).reduce((acc, [key, value]) => {
      if (value !== '') {
        acc[key] = value
      }
      return acc
    }, {} as any)

    if (isEditMode) {
      updateCompany.mutate(
        { id: company.id, payload },
        {
          onSuccess: () => {
            setIsComplete(true)
            // Brief delay to show 100% before closing
            setTimeout(() => {
              onClose()
            }, 500)
          },
        }
      )
    } else {
      createCompany.mutate(payload, {
        onSuccess: () => {
          setIsComplete(true)
          // Brief delay to show 100% before closing
          setTimeout(() => {
            onClose()
          }, 500)
        },
      })
    }
  }

  const isMutating = createCompany.isPending || updateCompany.isPending

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-md" showCloseButton={false}>
        {/* RetroLoading Overlay */}
        {isMutating && (
          <div className="absolute inset-0 z-50 flex items-center justify-center rounded-lg bg-zinc-950/95 backdrop-blur-sm">
            <RetroLoading
              text={isEditMode ? 'Updating company' : 'Adding company'}
              isComplete={isComplete}
            />
          </div>
        )}

        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-indigo-400" />
              {isEditMode ? 'Edit Company' : 'Add Target Company'}
            </div>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={onClose}
              disabled={isMutating}
              className="absolute top-2 right-2"
            >
              <X className="h-5 w-5" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="name" className="text-zinc-400">
              Company Name *
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="e.g. Google"
              {...register('name')}
              aria-invalid={!!errors.name}
            />
            {errors.name && (
              <p className="text-xs text-red-400">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="website" className="text-zinc-400">
              Website URL
            </Label>
            <Input
              id="website"
              type="text"
              placeholder="https://example.com"
              {...register('website')}
              aria-invalid={!!errors.website}
            />
            {errors.website && (
              <p className="text-xs text-red-400">{errors.website.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="location" className="text-zinc-400">
              Location
            </Label>
            <Input
              id="location"
              type="text"
              placeholder="e.g. Mountain View, CA"
              {...register('location')}
              aria-invalid={!!errors.location}
            />
            {errors.location && (
              <p className="text-xs text-red-400">{errors.location.message}</p>
            )}
          </div>

          <div className="flex justify-end gap-3 border-t border-zinc-800 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isMutating}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isMutating}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  {isEditMode ? 'Update' : 'Add'} Company
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
