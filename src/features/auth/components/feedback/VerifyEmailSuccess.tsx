import { Link } from 'react-router-dom'
import { CheckCircle, ArrowRight } from 'lucide-react'

export default function VerifyEmailSuccess() {
  return (
    <>
      <div className="rounded-full border border-emerald-500/20 bg-emerald-500/10 p-4 text-emerald-400 shadow-md">
        <CheckCircle className="h-12 w-12" />
      </div>
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight text-white">
          Email Verified
        </h2>
        <p className="text-sm text-zinc-400">
          Your email has been verified successfully! You can now log into your
          account.
        </p>
      </div>
      <Link
        to="/login"
        className="bg-indigo-650 flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-white shadow-lg transition-colors hover:bg-indigo-600"
      >
        Go to Login
        <ArrowRight className="h-4 w-4" />
      </Link>
    </>
  )
}
