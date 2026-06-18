import { Loader2 } from 'lucide-react'

export default function VerifyEmailLoading() {
  return (
    <>
      <Loader2 className="h-12 w-12 animate-spin text-indigo-400" />
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight text-white">
          Verifying Email
        </h2>
        <p className="text-sm text-zinc-400">
          Please wait while we confirm your email verification status...
        </p>
      </div>
    </>
  )
}
