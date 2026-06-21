import { Link } from 'react-router-dom'
import { CheckCircle } from 'lucide-react'

interface ForgotPasswordSuccessProps {
  message: string
}

export default function ForgotPasswordSuccess({
  message,
}: ForgotPasswordSuccessProps) {
  return (
    <div className="animate-fade-in w-full max-w-md space-y-6 text-center">
      <div className="flex flex-col items-center space-y-6 rounded-xl border border-white/[0.1] bg-white/[0.04] p-8 shadow-xl backdrop-blur-2xl">
        <div className="rounded-full border border-emerald-500/20 bg-emerald-500/10 p-4 text-emerald-400 shadow-md">
          <CheckCircle className="h-12 w-12" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight text-white">
            Email Sent
          </h2>
          <p className="text-sm leading-relaxed text-zinc-400">{message}</p>
        </div>
        <Link
          to="/login"
          className="bg-indigo-650 flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-white shadow-lg transition-colors hover:bg-indigo-600"
        >
          Back to Login
        </Link>
      </div>
    </div>
  )
}
