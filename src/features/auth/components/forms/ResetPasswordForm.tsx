import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Lock, ShieldAlert } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
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
      <div className="space-y-1.5">
        <Label
          className="text-zinc-355 flex items-center gap-1.5 text-xs font-semibold"
          htmlFor="password"
        >
          <Lock className="h-3.5 w-3.5 text-zinc-500" />
          New Password
        </Label>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          {...register('password')}
          className={`w-full border bg-zinc-950 ${
            errors.password
              ? 'border-red-500 ring-1 ring-red-500'
              : 'border-zinc-800'
          } rounded-lg px-3.5 py-2 text-sm text-white placeholder-zinc-700 transition-all outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500`}
        />
        {errors.password && (
          <p className="flex items-center gap-1 text-xs font-medium text-red-500">
            <ShieldAlert className="h-3.5 w-3.5" />
            {errors.password.message}
          </p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label
          className="text-zinc-350 flex items-center gap-1.5 text-xs font-semibold"
          htmlFor="confirmPassword"
        >
          <Lock className="h-3.5 w-3.5 text-zinc-500" />
          Confirm Password
        </Label>
        <Input
          id="confirmPassword"
          type="password"
          placeholder="••••••••"
          {...register('confirmPassword')}
          className={`w-full border bg-zinc-950 ${
            errors.confirmPassword
              ? 'border-red-500 ring-1 ring-red-500'
              : 'border-zinc-800'
          } rounded-lg px-3.5 py-2 text-sm text-white placeholder-zinc-700 transition-all outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500`}
        />
        {errors.confirmPassword && (
          <p className="flex items-center gap-1 text-xs font-medium text-red-500">
            <ShieldAlert className="h-3.5 w-3.5" />
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="disabled:bg-indigo-650 mt-4 flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/10 transition-all hover:bg-indigo-500 hover:shadow-indigo-600/20 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
        ) : (
          'Reset Password'
        )}
      </button>
    </form>
  )
}
