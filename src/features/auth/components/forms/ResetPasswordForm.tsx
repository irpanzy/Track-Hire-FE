import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Lock, Eye, EyeOff, AlertCircle, CheckCircle, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import {
  resetPasswordSchema,
  type ResetPasswordFormValues,
} from '../../schemas/resetPasswordSchema'

interface ResetPasswordFormProps {
  onSubmit: (data: ResetPasswordFormValues) => void
  isLoading: boolean
}

export default function ResetPasswordForm({
  onSubmit,
  isLoading,
}: ResetPasswordFormProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* New Password */}
      <div className="space-y-1.5">
        <Label
          htmlFor="password"
          className="flex items-center gap-1.5 text-sm font-medium text-zinc-300"
        >
          <Lock className="h-3.5 w-3.5 text-zinc-500" />
          New Password
        </Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="new-password"
            placeholder="••••••••"
            {...register('password')}
            aria-invalid={!!errors.password}
            className={cn(
              'h-10 border bg-zinc-900/80 pr-10 text-sm text-white placeholder:text-zinc-600 transition-colors',
              'focus-visible:border-indigo-500 focus-visible:ring-indigo-500/20',
              errors.password
                ? 'border-red-500/70 focus-visible:border-red-500 focus-visible:ring-red-500/20'
                : 'border-zinc-700/60'
            )}
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 transition-colors hover:text-zinc-300"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        {errors.password && (
          <p className="flex items-center gap-1.5 text-xs text-red-400">
            <AlertCircle className="h-3 w-3 shrink-0" />
            {errors.password.message}
          </p>
        )}
      </div>

      {/* Confirm Password */}
      <div className="space-y-1.5">
        <Label
          htmlFor="confirmPassword"
          className="flex items-center gap-1.5 text-sm font-medium text-zinc-300"
        >
          <Lock className="h-3.5 w-3.5 text-zinc-500" />
          Confirm Password
        </Label>
        <div className="relative">
          <Input
            id="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            autoComplete="new-password"
            placeholder="••••••••"
            {...register('confirmPassword')}
            aria-invalid={!!errors.confirmPassword}
            className={cn(
              'h-10 border bg-zinc-900/80 pr-10 text-sm text-white placeholder:text-zinc-600 transition-colors',
              'focus-visible:border-indigo-500 focus-visible:ring-indigo-500/20',
              errors.confirmPassword
                ? 'border-red-500/70 focus-visible:border-red-500 focus-visible:ring-red-500/20'
                : 'border-zinc-700/60'
            )}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword((v) => !v)}
            aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 transition-colors hover:text-zinc-300"
          >
            {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="flex items-center gap-1.5 text-xs text-red-400">
            <AlertCircle className="h-3 w-3 shrink-0" />
            {errors.confirmPassword.message}
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
            Resetting…
          </>
        ) : (
          <>
            <CheckCircle className="h-4 w-4" />
            Reset Password
          </>
        )}
      </Button>
    </form>
  )
}
