import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from 'react-router-dom'
import { Mail, Lock, ShieldAlert, ArrowRight } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  loginSchema,
  type LoginFormValues,
} from '../../schemas/loginSchema'

interface LoginFormProps {
  onSubmit: (data: LoginFormValues) => void
  isLoading: boolean
}

export default function LoginForm({ onSubmit, isLoading }: LoginFormProps) {
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
      <div className="space-y-2">
        <Label
          className="text-zinc-350 flex items-center gap-1.5 text-sm font-semibold"
          htmlFor="emailOrUsername"
        >
          <Mail className="h-4 w-4 text-zinc-500" />
          Email or Username
        </Label>
        <Input
          id="emailOrUsername"
          type="text"
          placeholder="johndoe or name@example.com"
          {...register('emailOrUsername')}
          className={`w-full border bg-zinc-950 ${
            errors.emailOrUsername
              ? 'border-red-500 ring-1 ring-red-500'
              : 'border-zinc-800'
          } rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-zinc-700 transition-all outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500`}
        />
        {errors.emailOrUsername && (
          <p className="flex items-center gap-1 text-xs font-medium text-red-500">
            <ShieldAlert className="h-3.5 w-3.5" />
            {errors.emailOrUsername.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label
            className="text-zinc-355 flex items-center gap-1.5 text-sm font-semibold"
            htmlFor="password"
          >
            <Lock className="h-4 w-4 text-zinc-500" />
            Password
          </Label>
          <Link
            to="/forgot-password"
            className="text-xs text-indigo-400 hover:text-indigo-300 hover:underline"
          >
            Forgot password?
          </Link>
        </div>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          {...register('password')}
          className={`w-full border bg-zinc-950 ${
            errors.password
              ? 'border-red-500 ring-1 ring-red-500'
              : 'border-zinc-800'
          } rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-zinc-700 transition-all outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500`}
        />
        {errors.password && (
          <p className="flex items-center gap-1 text-xs font-medium text-red-500">
            <ShieldAlert className="h-3.5 w-3.5" />
            {errors.password.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="disabled:bg-indigo-650 flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/10 transition-all hover:bg-indigo-500 hover:shadow-indigo-600/20 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
        ) : (
          <>
            Sign In
            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </button>
    </form>
  )
}
