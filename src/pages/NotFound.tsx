import { Link } from 'react-router-dom'
import { AlertTriangle, Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 px-6 py-12 text-center">
      <div className="max-w-md space-y-6">
        <div className="inline-flex rounded-full border border-red-500/20 bg-red-500/10 p-4 text-red-400">
          <AlertTriangle className="h-10 w-10" />
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
          Page Not Found
        </h1>
        <p className="text-sm text-zinc-400">
          Sorry, we couldn&apos;t find the page you are looking for. It might
          have been moved or deleted.
        </p>
        <Link
          to="/"
          className="mx-auto inline-flex cursor-pointer items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/15 transition-all hover:bg-indigo-500"
        >
          <Home className="h-4 w-4" />
          Go back home
        </Link>
      </div>
    </div>
  )
}
