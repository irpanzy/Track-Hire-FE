import { Outlet, Navigate } from 'react-router-dom'
import { useAuthStore } from '@/features/auth'
import { Briefcase } from 'lucide-react'

export default function AuthLayout() {
  const { isAuthenticated } = useAuthStore()

  if (isAuthenticated) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="flex min-h-screen bg-zinc-900">
      {/* Left panel: Info/Hero panel (hidden on mobile) */}
      <div className="border-zinc-850 relative hidden w-1/2 flex-col justify-between border-r bg-zinc-950 p-10 text-white lg:flex">
        <div className=".bg-radial-\[circle_at_center\,_var\(--tw-gradient-stops\)\] { --tw-gradient-position: circle at center, var(--tw-gradient-stops); background-image: radial-gradient(var(--tw-gradient-stops,circle at center, var(--tw-gradient-stops))); } absolute inset-0 from-zinc-900 via-zinc-950 to-black opacity-80" />

        {/* Subtle grid decoration */}
        <div className=".\[mask-image\:radial-gradient\(ellipse_60\%_50\%_at_50\%_0\%\,\#000_70\%\,transparent_100\%\)\] { mask-image: radial-gradient(ellipse 60% 50% at 50% 0%,#000 70%,transparent 100%); } absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)]" />

        <div className="relative z-10 flex items-center gap-2 text-lg font-semibold tracking-tight">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-700 bg-zinc-900 text-white shadow-lg">
            <Briefcase className="h-5 w-5 text-indigo-400" />
          </div>
          <span className=".bg-gradient-to-r { --tw-gradient-position: to right in oklab; background-image: linear-gradient(var(--tw-gradient-stops)); } from-white via-zinc-200 to-zinc-400 bg-clip-text text-xl font-bold text-transparent">
            Track Hire
          </span>
        </div>

        <div className="relative z-10 my-auto max-w-md space-y-4">
          <h1 className=".bg-gradient-to-br { --tw-gradient-position: to bottom right in oklab; background-image: linear-gradient(var(--tw-gradient-stops)); } from-white to-zinc-400 bg-clip-text text-4xl leading-tight font-extrabold tracking-tight text-transparent">
            Manage your job search like a pro.
          </h1>
          <p className="text-lg leading-relaxed text-zinc-400">
            Keep track of application statuses, automate follow-ups, and get
            details extracted using cutting-edge AI.
          </p>
        </div>

        <div className="relative z-10 flex items-center justify-between border-t border-zinc-900 pt-6 text-xs text-zinc-500">
          <span>
            &copy; {new Date().getFullYear()} Track Hire Inc. All rights
            reserved.
          </span>
          <a href="#" className="hover:text-zinc-350 transition-colors">
            Privacy Policy
          </a>
        </div>
      </div>

      {/* Right panel: Auth Forms */}
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          {/* Logo on mobile only */}
          <div className="mb-6 flex items-center justify-center gap-2 lg:hidden">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-700 bg-zinc-800 text-white shadow-md">
              <Briefcase className="h-5 w-5 text-indigo-400" />
            </div>
            <span className="text-2xl font-bold text-white">Track Hire</span>
          </div>
        </div>

        <div className="w-full sm:max-w-md">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
