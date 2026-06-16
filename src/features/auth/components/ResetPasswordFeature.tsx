import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { AlertCircle, ShieldCheck, TriangleAlert } from 'lucide-react'
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
    <div className="animate-fade-in w-full space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600/15 text-indigo-400">
            <ShieldCheck className="h-4 w-4" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white">
            Set New Password
          </h2>
        </div>
        <p className="mt-1 text-sm text-zinc-500">
          Enter your new password below to update your account credentials.
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

        {!token ? (
          <div className="flex items-start gap-3 rounded-lg border border-amber-500/20 bg-amber-500/10 px-4 py-3 text-sm text-amber-400">
            <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0" />
            <p className="text-xs leading-relaxed">
              Reset token is missing. Please click the reset link sent to your email.
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
