import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  User,
  Mail,
  Lock,
  AtSign,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle,
  ArrowRight,
  Loader2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import {
  registerSchema,
  type RegisterFormValues,
} from '../../schemas/registerSchema'

interface RegisterFormProps {
  onSubmit: (data: RegisterFormValues) => void
  isLoading: boolean
}

function getPasswordStrength(password: string): {
  score: number
  label: string
  color: string
  barColor: string
} {
  if (!password) return { score: 0, label: '', color: '', barColor: '' }

  let score = 0
  if (password.length >= 8) score++
  if (/[A-Z]/.test(password)) score++
  if (/[a-z]/.test(password)) score++
  if (/[0-9]/.test(password)) score++
  if (/[^A-Za-z0-9]/.test(password)) score++

  if (score <= 1)
    return {
      score: 1,
      label: 'Weak',
      color: 'text-red-400',
      barColor: 'bg-red-500',
    }
  if (score === 2)
    return {
      score: 2,
      label: 'Fair',
      color: 'text-amber-400',
      barColor: 'bg-amber-500',
    }
  if (score === 3 || score === 4)
    return {
      score: 3,
      label: 'Strong',
      color: 'text-emerald-400',
      barColor: 'bg-emerald-500',
    }
  return {
    score: 4,
    label: 'Very Strong',
    color: 'text-indigo-400',
    barColor: 'bg-indigo-500',
  }
}

export default function RegisterForm({
  onSubmit,
  isLoading,
}: RegisterFormProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const passwordValue = watch('password')
  const confirmPasswordValue = watch('confirmPassword')
  const strength = getPasswordStrength(passwordValue)
  const passwordsMatch =
    !!passwordValue &&
    !!confirmPasswordValue &&
    passwordValue === confirmPasswordValue

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Full Name */}
      <div className="space-y-1.5">
        <Label
          htmlFor="name"
          className="flex items-center gap-1.5 text-sm font-medium text-zinc-300"
        >
          <User className="h-3.5 w-3.5 text-zinc-500" />
          Full Name
        </Label>
        <Input
          id="name"
          type="text"
          autoComplete="name"
          placeholder="John Doe"
          {...register('name')}
          aria-invalid={!!errors.name}
          className={cn(
            'h-10 border bg-zinc-900/80 text-sm text-white transition-colors placeholder:text-zinc-600',
            'focus-visible:border-indigo-500 focus-visible:ring-indigo-500/20',
            errors.name
              ? 'border-red-500/70 focus-visible:border-red-500 focus-visible:ring-red-500/20'
              : 'border-zinc-700/60'
          )}
        />
        {errors.name && (
          <p className="flex items-center gap-1.5 text-xs text-red-400">
            <AlertCircle className="h-3 w-3 shrink-0" />
            {errors.name.message}
          </p>
        )}
      </div>

      {/* Username */}
      <div className="space-y-1.5">
        <Label
          htmlFor="username"
          className="flex items-center gap-1.5 text-sm font-medium text-zinc-300"
        >
          <AtSign className="h-3.5 w-3.5 text-zinc-500" />
          Username
        </Label>
        <Input
          id="username"
          type="text"
          autoComplete="username"
          placeholder="johndoe_99"
          {...register('username')}
          aria-invalid={!!errors.username}
          className={cn(
            'h-10 border bg-zinc-900/80 text-sm text-white transition-colors placeholder:text-zinc-600',
            'focus-visible:border-indigo-500 focus-visible:ring-indigo-500/20',
            errors.username
              ? 'border-red-500/70 focus-visible:border-red-500 focus-visible:ring-red-500/20'
              : 'border-zinc-700/60'
          )}
        />
        {errors.username && (
          <p className="flex items-center gap-1.5 text-xs text-red-400">
            <AlertCircle className="h-3 w-3 shrink-0" />
            {errors.username.message}
          </p>
        )}
      </div>

      {/* Email */}
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

      {/* Password */}
      <div className="space-y-1.5">
        <Label
          htmlFor="password"
          className="flex items-center gap-1.5 text-sm font-medium text-zinc-300"
        >
          <Lock className="h-3.5 w-3.5 text-zinc-500" />
          Password
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

        {/* Password strength bar */}
        {passwordValue && (
          <div className="space-y-1.5 pt-0.5">
            <div className="flex gap-1">
              {[1, 2, 3, 4].map((segment) => (
                <div
                  key={segment}
                  className={cn(
                    'h-1 flex-1 rounded-full transition-all duration-300',
                    strength.score >= segment
                      ? strength.barColor
                      : 'bg-zinc-700/50'
                  )}
                />
              ))}
            </div>
            <p
              className={cn(
                'text-xs font-medium transition-colors',
                strength.color
              )}
            >
              {strength.label}
            </p>
          </div>
        )}

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
              'h-10 border bg-zinc-900/80 pr-10 text-sm text-white transition-colors placeholder:text-zinc-600',
              'focus-visible:border-indigo-500 focus-visible:ring-indigo-500/20',
              errors.confirmPassword
                ? 'border-red-500/70 focus-visible:border-red-500 focus-visible:ring-red-500/20'
                : 'border-zinc-700/60'
            )}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword((v) => !v)}
            aria-label={
              showConfirmPassword
                ? 'Hide confirm password'
                : 'Show confirm password'
            }
            className="absolute top-1/2 right-3 -translate-y-1/2 text-zinc-500 transition-colors hover:text-zinc-300"
          >
            {showConfirmPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>

        {/* Password match indicator */}
        {confirmPasswordValue && !errors.confirmPassword && (
          <p
            className={cn(
              'flex items-center gap-1.5 text-xs font-medium transition-colors',
              passwordsMatch ? 'text-emerald-400' : 'text-zinc-500'
            )}
          >
            <CheckCircle
              className={cn(
                'h-3 w-3 shrink-0 transition-colors',
                passwordsMatch ? 'text-emerald-400' : 'text-zinc-600'
              )}
            />
            {passwordsMatch ? 'Passwords match' : 'Passwords do not match'}
          </p>
        )}

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
        className="mt-2 h-10 w-full gap-2 bg-indigo-600 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition-all hover:bg-indigo-500 hover:shadow-indigo-600/30 disabled:opacity-60"
      >
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Creating account…
          </>
        ) : (
          <>
            Create Account
            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </Button>
    </form>
  )
}
