import { useLocation, Outlet, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useAuthStore } from '@/features/auth'
import { Briefcase } from 'lucide-react'

function RedirectToLogin({ from }: { from: ReturnType<typeof useLocation> }) {
  const navigate = useNavigate()
  useEffect(() => {
    navigate('/login', { replace: true, state: { from } })
  }, [navigate, from])
  return null
}

export default function ProtectedRoute() {
  const { isAuthenticated, isCheckingAuth } = useAuthStore()
  const location = useLocation()

  if (isCheckingAuth) {
    return (
      <div className="gradient-mesh flex min-h-screen flex-col items-center justify-center space-y-4">
        <div className="glass relative flex h-12 w-12 items-center justify-center rounded-xl text-indigo-400 shadow-xl">
          <Briefcase className="h-6 w-6" />
          <span className="absolute inset-[-4px] animate-spin rounded-xl border-2 border-indigo-500 border-t-transparent" />
        </div>
        <p className="animate-pulse text-sm font-medium text-zinc-400">
          Securing session...
        </p>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <RedirectToLogin from={location} />
  }

  return <Outlet />
}
