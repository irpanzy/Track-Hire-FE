import { Link } from 'react-router-dom'
import { CheckCircle, ArrowRight } from 'lucide-react'

interface RegisterSuccessProps {
  message: string
}

export default function RegisterSuccess({ message }: RegisterSuccessProps) {
  return (
    <div className="animate-fade-in w-full max-w-md space-y-6 text-center">
      <div className="flex flex-col items-center space-y-6 rounded-xl border border-zinc-800 bg-zinc-900 p-8 shadow-xl">
        <div className="rounded-full border border-emerald-500/20 bg-emerald-500/10 p-4 text-emerald-400 shadow-md">
          <CheckCircle className="h-12 w-12" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight text-white">
            Check Your Inbox
          </h2>
          <p className="text-sm leading-relaxed text-zinc-400">{message}</p>
        </div>
        <Link
          to="/login"
          className="bg-indigo-650 flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-white shadow-lg transition-colors hover:bg-indigo-600"
        >
          Back to Login
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  )
}
