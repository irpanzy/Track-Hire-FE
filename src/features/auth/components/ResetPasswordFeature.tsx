import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { AlertCircle } from 'lucide-react'
import { useResetPassword } from '../hooks/useAuthMutations'
import ResetPasswordForm from './forms/ResetPasswordForm'
import ResetPasswordSuccess from './feedback/ResetPasswordSuccess'
import type { ResetPasswordFormValues } from '../schemas/resetPasswordSchema'

export default function ResetPasswordFeature() {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')
  const [isSuccess, setIsSuccess] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)

  const resetMutation = useResetPassword(
    token,
    () => {
      setIsSuccess(true)
    },
    (error) => {
      setApiError(
        error.response?.data?.message ||
          error.message ||
          'Reset password failed. Please try again.'
      )
    }
  )

  const onSubmit = (data: ResetPasswordFormValues) => {
    setApiError(null)
    if (!token) {
      setApiError('Reset token is missing from URL query parameter.')
      return
    }
    resetMutation.mutate(data)
  }

  if (isSuccess) {
    return <ResetPasswordSuccess />
  }

  return (
    <div className="animate-fade-in w-full max-w-md space-y-8">
      <div>
        <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          Set New Password
        </h2>
        <p className="mt-2.5 text-sm text-zinc-400">
          Enter your new password below to update your account credentials.
        </p>
      </div>

      <div className="space-y-5 rounded-xl border border-zinc-800 bg-zinc-900 p-6 shadow-xl sm:p-8">
        {apiError && (
          <div className="flex items-start gap-2.5 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
            <p className="text-red-455 text-xs leading-relaxed">{apiError}</p>
          </div>
        )}

        {!token ? (
          <div className="flex items-start gap-2.5 rounded-lg border border-amber-500/20 bg-amber-500/10 px-4 py-3 text-sm text-amber-400">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
            <p className="text-amber-455 text-xs leading-relaxed">
              Reset token is missing. Please click the reset link sent to your
              email.
            </p>
          </div>
        ) : (
          <ResetPasswordForm
            onSubmit={onSubmit}
            isLoading={resetMutation.isPending}
          />
        )}
      </div>
    </div>
  )
}
