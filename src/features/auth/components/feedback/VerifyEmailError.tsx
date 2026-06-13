import { Link } from 'react-router-dom'
import { XCircle } from 'lucide-react'

interface VerifyEmailErrorProps {
  message: string
}

export default function VerifyEmailError({ message }: VerifyEmailErrorProps) {
  return (
    <>
      <div className="rounded-full border border-red-500/20 bg-red-500/10 p-4 text-red-400 shadow-md">
        <XCircle className="h-12 w-12" />
      </div>
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight text-white">
          Verification Failed
        </h2>
        <p className="text-red-405 text-sm leading-relaxed">{message}</p>
      </div>
      <Link
        to="/login"
        className="bg-zinc-850 flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-white shadow-lg transition-colors hover:bg-zinc-800"
      >
        Back to Login
      </Link>
    </>
  )
}
