import { useSearchParams } from 'react-router-dom'
import { useVerifyEmail } from '../hooks/useAuthMutations'
import VerifyEmailLoading from './feedback/VerifyEmailLoading'
import VerifyEmailSuccess from './feedback/VerifyEmailSuccess'
import VerifyEmailError from './feedback/VerifyEmailError'

export default function VerifyEmailFeature() {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')

  const { isLoading, isError, error } = useVerifyEmail(token)
  const errorMessage = error
    ? error.response?.data?.message ||
      error.message ||
      'Invalid or expired verification token.'
    : ''

  return (
    <div className="animate-fade-in w-full space-y-6 text-center">
      <div className="flex flex-col items-center space-y-6 rounded-xl border border-zinc-800/80 bg-zinc-900/60 p-8 shadow-xl backdrop-blur-sm">
        {isLoading && <VerifyEmailLoading />}
        {!isLoading && !isError && <VerifyEmailSuccess />}
        {!isLoading && isError && <VerifyEmailError message={errorMessage} />}
      </div>
    </div>
  )
}
