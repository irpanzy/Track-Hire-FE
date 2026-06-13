import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AlertCircle } from 'lucide-react'
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
    <div className="animate-fade-in w-full max-w-md space-y-8">
      <div className="text-center lg:text-left">
        <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          Get Started
        </h2>
        <p className="mt-2.5 text-sm text-zinc-400">
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-semibold text-indigo-400 hover:text-indigo-300 hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>

      <div className="space-y-5 rounded-xl border border-zinc-800 bg-zinc-900 p-6 shadow-xl sm:p-8">
        {apiError && (
          <div className="animate-shake flex items-start gap-2.5 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
            <div>
              <p className="font-semibold">Registration failed</p>
              <p className="text-red-405 mt-0.5 text-xs leading-relaxed">
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
