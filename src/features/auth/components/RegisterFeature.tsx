import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AlertCircle, UserPlus } from 'lucide-react'
import { useRegister } from '../hooks/useAuthMutations'
import RegisterForm from './forms/RegisterForm'
import RegisterSuccess from './feedback/RegisterSuccess'
import type { RegisterFormValues } from '../schemas/registerSchema'

export default function RegisterFeature() {
  const [apiError, setApiError] = useState<string | null>(null)
  const [isSuccess, setIsSuccess] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  const registerMutation = useRegister(
    (data) => {
      setIsSuccess(true)
      setSuccessMessage(
        data.message || 'Registration successful. Please verify your email.'
      )
    },
    (error) => {
      const message =
        error.response?.data?.message ||
        'Registration failed. Please try again.'
      setApiError(message)
    }
  )

  const onSubmit = (data: RegisterFormValues) => {
    setApiError(null)
    registerMutation.mutate(data)
  }

  if (isSuccess) {
    return <RegisterSuccess message={successMessage} />
  }

  return (
    <div className="animate-fade-in w-full space-y-6">
      {/* Header */}
      <div>
        <div className="mb-1 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600/15 text-indigo-400">
            <UserPlus className="h-4 w-4" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white">
            Get Started
          </h2>
        </div>
        <p className="mt-1 text-sm text-zinc-500">
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-medium text-indigo-400 transition-colors hover:text-indigo-300 hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>

      {/* Card */}
      <div className="rounded-xl border border-white/[0.1] bg-white/[0.04] p-5 shadow-xl backdrop-blur-2xl sm:p-6">
        {apiError && (
          <div className="mb-5 flex items-start gap-3 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <div>
              <p className="font-semibold">Registration failed</p>
              <p className="mt-0.5 text-xs leading-relaxed text-red-400/80">
                {apiError}
              </p>
            </div>
          </div>
        )}

        <RegisterForm
          onSubmit={onSubmit}
          isLoading={registerMutation.isPending}
        />
      </div>
    </div>
  )
}
