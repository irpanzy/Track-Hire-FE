import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AlertCircle } from 'lucide-react'
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
    <div className="animate-fade-in w-full max-w-md space-y-8">
      <div className="text-center lg:text-left">
        <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          Welcome back
        </h2>
        <p className="mt-2.5 text-sm text-zinc-400">
          New to Track Hire?{' '}
          <Link
            to="/register"
            className="font-semibold text-indigo-400 hover:text-indigo-300 hover:underline"
          >
            Create an account
          </Link>
        </p>
      </div>

      <div className="space-y-6 rounded-xl border border-zinc-800 bg-zinc-900 p-6 shadow-xl sm:p-8">
        {apiError && (
          <div className="animate-shake flex items-start gap-2.5 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
            <div>
              <p className="font-semibold">Authentication failed</p>
              <p className="text-red-405 mt-0.5 text-xs leading-relaxed">
                {apiError}
              </p>
            </div>
          </div>
        )}

        <LoginForm
          onSubmit={handleLoginFormSubmit}
          isLoading={loginMutation.isPending || googleLoginMutation.isPending}
        />

        <div className="relative">
          <div
            className="absolute inset-0 flex items-center"
            aria-hidden="true"
          >
            <div className="w-full border-t border-zinc-800" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-zinc-900 px-2 text-zinc-500">
              Or continue with
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
