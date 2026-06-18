import { Outlet, Navigate } from 'react-router-dom'
import { useAuthStore } from '@/features/auth'
import logoLight from '@/assets/logo-track-hire-light.png'

export default function AuthLayout() {
  const { isAuthenticated } = useAuthStore()

  if (isAuthenticated) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="flex min-h-screen overflow-x-hidden bg-zinc-950">
      {/* Left panel: Info/Hero panel — hidden on mobile */}
      <div className="relative hidden w-1/2 flex-col justify-between border-r border-zinc-800 bg-zinc-950 p-10 text-white lg:flex">
        {/* Background radial gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(99,102,241,0.08),transparent_60%)]" />

        {/* Subtle grid decoration */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              'linear-gradient(to right, #8080800a 1px, transparent 1px), linear-gradient(to bottom, #8080800a 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        <div className="relative z-10">
          <img src={logoLight} alt="Track Hire" className="h-15 w-auto" />
        </div>

        {/* Hero content */}
        <div className="relative z-10 my-auto max-w-md space-y-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-400">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
            AI-powered job tracking
          </div>
          <h1 className="bg-gradient-to-br from-white to-zinc-400 bg-clip-text text-4xl leading-tight font-extrabold tracking-tight text-transparent">
            Manage your job search like a pro.
          </h1>
          <p className="text-base leading-relaxed text-zinc-400">
            Keep track of application statuses, automate follow-ups, and get
            details extracted using cutting-edge AI.
          </p>

          {/* Feature pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              'Application Tracking',
              'AI Extraction',
              'Smart Reminders',
              'Analytics',
            ].map((f) => (
              <span
                key={f}
                className="rounded-full border border-zinc-700/60 bg-zinc-800/60 px-3 py-1 text-xs text-zinc-300"
              >
                {f}
              </span>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 flex items-center justify-between border-t border-zinc-800 pt-6 text-xs text-zinc-500">
          <span>
            © {new Date().getFullYear()} Track Hire Inc. All rights reserved.
          </span>
          <a href="#" className="transition-colors hover:text-zinc-300">
            Privacy Policy
          </a>
        </div>
      </div>

      {/* Right panel: Auth Forms */}
      <div className="flex flex-1 flex-col items-center justify-center overflow-x-hidden px-4 py-8 sm:px-6 sm:py-10 lg:px-10">
        {/* Logo — mobile only */}
        <div className="mb-8 lg:hidden">
          <img src={logoLight} alt="Track Hire" className="h-14 w-auto" />
        </div>

        <div className="w-full max-w-[420px]">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
