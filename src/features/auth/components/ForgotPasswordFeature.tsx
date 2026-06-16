import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, AlertCircle, KeyRound } from 'lucide-react'
import { useForgotPassword } from '../hooks/useAuthMutations'
import ForgotPasswordForm from './forms/ForgotPasswordForm'
import ForgotPasswordSuccess from './feedback/ForgotPasswordSuccess'
import type { ForgotPasswordFormValues } from '../schemas/forgotPasswordSchema'

export default function ForgotPasswordFeature() {
  const [isSuccess, setIsSuccess] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [apiError, setApiError] = useState<string | null>(null)

  const forgotMutation = useForgotPassword(
    (data) => {
      setIsSuccess(true)
      setSuccessMessage(
        data.message ||
          'If an account with that email exists, a password reset link has been sent.'
      )
    },
    (error) => {
      setApiError(
        error.response?.data?.message || 'Request failed. Please try again.'
      )
    }
  )

  const onSubmit = (data: ForgotPasswordFormValues) => {
    setApiError(null)
    forgotMutation.mutate(data)
  }

  if (isSuccess) {
    return <ForgotPasswordSuccess message={successMessage} />
  }

  return (
    <div className="animate-fade-in w-full space-y-6">
      {/* Header */}
      <div>
        <Link
          to="/login"
          className="mb-3 inline-flex items-center gap-1.5 text-xs font-medium text-zinc-500 transition-colors hover:text-zinc-300"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Login
        </Link>
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600/15 text-indigo-400">
            <KeyRound className="h-4 w-4" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white">
            Reset Password
          </h2>
        </div>
        <p className="mt-1 text-sm text-zinc-500">
          Enter your email and we'll send you instructions to reset your
          password.
        </p>
      </div>

      {/* Card */}
      <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/60 p-5 shadow-xl backdrop-blur-sm sm:p-6">
        {apiError && (
          <div className="mb-5 flex items-start gap-3 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <p className="text-xs leading-relaxed">{apiError}</p>
          </div>
        )}

        <ForgotPasswordForm
          onSubmit={onSubmit}
          isLoading={forgotMutation.isPending}
        />
      </div>
    </div>
  )
}
