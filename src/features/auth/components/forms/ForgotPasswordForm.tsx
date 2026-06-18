import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Mail, AlertCircle, Send, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import {
  forgotPasswordSchema,
  type ForgotPasswordFormValues,
} from '../../schemas/forgotPasswordSchema'

interface ForgotPasswordFormProps {
  onSubmit: (data: ForgotPasswordFormValues) => void
  isLoading: boolean
}

export default function ForgotPasswordForm({
  onSubmit,
  isLoading,
}: ForgotPasswordFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-1.5">
        <Label
          htmlFor="email"
          className="flex items-center gap-1.5 text-sm font-medium text-zinc-300"
        >
          <Mail className="h-3.5 w-3.5 text-zinc-500" />
          Email Address
        </Label>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="name@example.com"
          {...register('email')}
          aria-invalid={!!errors.email}
          className={cn(
            'h-10 border bg-zinc-900/80 text-sm text-white transition-colors placeholder:text-zinc-600',
            'focus-visible:border-indigo-500 focus-visible:ring-indigo-500/20',
            errors.email
              ? 'border-red-500/70 focus-visible:border-red-500 focus-visible:ring-red-500/20'
              : 'border-zinc-700/60'
          )}
        />
        {errors.email && (
          <p className="flex items-center gap-1.5 text-xs text-red-400">
            <AlertCircle className="h-3 w-3 shrink-0" />
            {errors.email.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="h-10 w-full gap-2 bg-indigo-600 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition-all hover:bg-indigo-500 hover:shadow-indigo-600/30 disabled:opacity-60"
      >
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending…
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />
            Send Instructions
          </>
        )}
      </Button>
    </form>
  )
}
