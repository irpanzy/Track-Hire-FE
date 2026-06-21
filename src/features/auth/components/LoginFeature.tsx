import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AlertCircle, LogIn } from 'lucide-react'
import { useLogin, useGoogleLogin } from '../hooks/useAuthMutations'
import LoginForm from './forms/LoginForm'
import GoogleLoginButton from './GoogleLoginButton'
import type { LoginFormValues } from '../schemas/loginSchema'

export default function LoginFeature() {
  const [apiError, setApiError] = useState<string | null>(null)

  const loginMutation = useLogin(undefined, (error) => {
    const message =
      error.response?.data?.message || 'Login failed. Please try again.'
    setApiError(message)
  })

  const googleLoginMutation = useGoogleLogin(undefined, (error) => {
    const message =
      error.response?.data?.message || 'Google authentication failed.'
    setApiError(message)
  })

  const handleLoginFormSubmit = (data: LoginFormValues) => {
    setApiError(null)
    loginMutation.mutate(data)
  }

  return (
    <div className="animate-fade-in w-full space-y-6">
      {/* Header */}
      <div>
        <div className="mb-1 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600/15 text-indigo-400">
            <LogIn className="h-4 w-4" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white">
            Welcome back
          </h2>
        </div>
        <p className="mt-1 text-sm text-zinc-500">
          Don't have an account?{' '}
          <Link
            to="/register"
            className="font-medium text-indigo-400 transition-colors hover:text-indigo-300 hover:underline"
          >
            Create one for free
          </Link>
        </p>
      </div>

      {/* Card */}
      <div className="rounded-xl border border-white/[0.1] bg-white/[0.04] p-5 shadow-xl backdrop-blur-2xl sm:p-6">
        {/* API Error */}
        {apiError && (
          <div className="mb-5 flex items-start gap-3 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <div>
              <p className="font-semibold">Authentication failed</p>
              <p className="mt-0.5 text-xs leading-relaxed text-red-400/80">
                {apiError}
              </p>
            </div>
          </div>
        )}

        <LoginForm
          onSubmit={handleLoginFormSubmit}
          isLoading={loginMutation.isPending || googleLoginMutation.isPending}
        />

        {/* Divider */}
        <div className="relative my-5">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-zinc-800" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-zinc-900/80 px-2.5 text-zinc-600 backdrop-blur-xl">
              or continue with
            </span>
          </div>
        </div>

        <GoogleLoginButton
          onSuccess={async (credentialResponse) => {
            if (credentialResponse.credential) {
              setApiError(null)
              googleLoginMutation.mutate(credentialResponse.credential)
            }
          }}
          onError={() => {
            setApiError('Google Sign-In failed. Please try again.')
          }}
        />
      </div>
    </div>
  )
}
