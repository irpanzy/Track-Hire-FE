import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { AlertCircle, LogIn, ShieldCheck, TriangleAlert } from 'lucide-react'
import { useResetPassword } from '../hooks/useAuthMutations'
import ResetPasswordForm from './forms/ResetPasswordForm'
import ResetPasswordSuccess from './feedback/ResetPasswordSuccess'
import type { ResetPasswordFormValues } from '../schemas/resetPasswordSchema'

const GOOGLE_ACCOUNT_ERROR_MESSAGE =
  'Password reset is not available for accounts registered via Google. Please sign in with Google.'

export default function ResetPasswordFeature() {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')
  const [isSuccess, setIsSuccess] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)

  const isGoogleAccountError = apiError === GOOGLE_ACCOUNT_ERROR_MESSAGE

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
        {/* Google account restriction notice */}
        {isGoogleAccountError ? (
          <div className="flex flex-col gap-3 rounded-lg border border-amber-500/20 bg-amber-500/10 px-4 py-4">
            <div className="flex items-start gap-3">
              <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
              <div className="space-y-1">
                <p className="text-sm font-medium text-amber-300">
                  Password Reset Unavailable
                </p>
                <p className="text-xs leading-relaxed text-amber-400/80">
                  This account was registered using Google Sign-In and does not
                  have a password. Please sign in with your Google account
                  instead.
                </p>
              </div>
            </div>
            <Link
              to="/login"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-amber-500/30 bg-amber-500/15 px-4 py-2 text-xs font-semibold text-amber-300 transition-colors hover:bg-amber-500/25 hover:text-amber-200"
            >
              <LogIn className="h-3.5 w-3.5" />
              Sign in with Google
            </Link>
          </div>
        ) : (
          <>
            {/* Generic API error */}
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
                  Reset token is missing. Please click the reset link sent to
                  your email.
                </p>
              </div>
            ) : (
              <ResetPasswordForm
                onSubmit={onSubmit}
                isLoading={resetMutation.isPending}
              />
            )}
          </>
        )}
      </div>
    </div>
  )
}
