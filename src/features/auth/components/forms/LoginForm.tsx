import { useState, useEffect } from 'react'
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

const REMEMBER_ME_KEY = 'track-hire-remember-me'
const SAVED_CREDENTIALS_KEY = 'track-hire-saved-credentials'

export default function LoginForm({ onSubmit, isLoading }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      emailOrUsername: '',
      password: '',
    },
  })

  // Load saved credentials on mount
  useEffect(() => {
    const savedRememberMe = localStorage.getItem(REMEMBER_ME_KEY) === 'true'
    const savedCredentials = localStorage.getItem(SAVED_CREDENTIALS_KEY)

    if (savedRememberMe && savedCredentials) {
      try {
        const { emailOrUsername } = JSON.parse(savedCredentials)
        setValue('emailOrUsername', emailOrUsername)
        setRememberMe(true)
      } catch (error) {
        console.error('Failed to load saved credentials:', error)
      }
    }
  }, [setValue])

  const handleFormSubmit = (data: LoginFormValues) => {
    // Save credentials if remember me is checked
    if (rememberMe) {
      localStorage.setItem(REMEMBER_ME_KEY, 'true')
      localStorage.setItem(
        SAVED_CREDENTIALS_KEY,
        JSON.stringify({ emailOrUsername: data.emailOrUsername })
      )
    } else {
      localStorage.removeItem(REMEMBER_ME_KEY)
      localStorage.removeItem(SAVED_CREDENTIALS_KEY)
    }

    onSubmit(data)
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-5">
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

      {/* Remember Me */}
      <div className="flex items-center gap-2">
        <input
          id="rememberMe"
          type="checkbox"
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
          className="h-4 w-4 cursor-pointer rounded border-zinc-700 bg-zinc-900 text-indigo-600 transition-colors focus:ring-2 focus:ring-indigo-500/20 focus:ring-offset-0"
        />
        <Label
          htmlFor="rememberMe"
          className="cursor-pointer text-sm font-normal text-zinc-400 transition-colors hover:text-zinc-300"
        >
          Remember me
        </Label>
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
