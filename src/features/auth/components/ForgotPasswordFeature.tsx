import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, AlertCircle } from 'lucide-react'
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
    <div className="animate-fade-in w-full max-w-md space-y-8">
      <div>
        <Link
          to="/login"
          className="hover:text-zinc-350 mb-4 inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-400 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Login
        </Link>
        <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          Reset Password
        </h2>
        <p className="mt-2.5 text-sm text-zinc-500">
          Enter your email address and we&apos;ll send you instructions to reset
          your password.
        </p>
      </div>

      <div className="space-y-5 rounded-xl border border-zinc-800 bg-zinc-900 p-6 shadow-xl sm:p-8">
        {apiError && (
          <div className="flex items-start gap-2.5 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
            <p className="text-red-450 text-xs leading-relaxed">{apiError}</p>
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
