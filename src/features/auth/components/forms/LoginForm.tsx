import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from 'react-router-dom'
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  ArrowRight,
  Loader2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { loginSchema, type LoginFormValues } from '../../schemas/loginSchema'

interface LoginFormProps {
  onSubmit: (data: LoginFormValues) => void
  isLoading: boolean
}

export default function LoginForm({ onSubmit, isLoading }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      emailOrUsername: '',
      password: '',
    },
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Email or Username */}
      <div className="space-y-1.5">
        <Label
          htmlFor="emailOrUsername"
          className="flex items-center gap-1.5 text-sm font-medium text-zinc-300"
        >
          <Mail className="h-3.5 w-3.5 text-zinc-500" />
          Email or Username
        </Label>
        <Input
          id="emailOrUsername"
          type="text"
          autoComplete="username"
          placeholder="johndoe or name@example.com"
          {...register('emailOrUsername')}
          aria-invalid={!!errors.emailOrUsername}
          className={cn(
            'h-10 border bg-zinc-900/80 text-sm text-white transition-colors placeholder:text-zinc-600',
            'focus-visible:border-indigo-500 focus-visible:ring-indigo-500/20',
            errors.emailOrUsername
              ? 'border-red-500/70 focus-visible:border-red-500 focus-visible:ring-red-500/20'
              : 'border-zinc-700/60'
          )}
        />
        {errors.emailOrUsername && (
          <p className="flex items-center gap-1.5 text-xs text-red-400">
            <AlertCircle className="h-3 w-3 shrink-0" />
            {errors.emailOrUsername.message}
          </p>
        )}
      </div>

      {/* Password */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <Label
            htmlFor="password"
            className="flex items-center gap-1.5 text-sm font-medium text-zinc-300"
          >
            <Lock className="h-3.5 w-3.5 text-zinc-500" />
            Password
          </Label>
          <Link
            to="/forgot-password"
            className="text-xs text-indigo-400 transition-colors hover:text-indigo-300 hover:underline"
          >
            Forgot password?
          </Link>
        </div>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            placeholder="••••••••"
            {...register('password')}
            aria-invalid={!!errors.password}
            className={cn(
              'h-10 border bg-zinc-900/80 pr-10 text-sm text-white transition-colors placeholder:text-zinc-600',
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
            className="absolute top-1/2 right-3 -translate-y-1/2 text-zinc-500 transition-colors hover:text-zinc-300"
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
        {errors.password && (
          <p className="flex items-center gap-1.5 text-xs text-red-400">
            <AlertCircle className="h-3 w-3 shrink-0" />
            {errors.password.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="mt-1 h-10 w-full gap-2 bg-indigo-600 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition-all hover:bg-indigo-500 hover:shadow-indigo-600/30 disabled:opacity-60"
      >
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Signing in…
          </>
        ) : (
          <>
            Sign In
            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </Button>
    </form>
  )
}
