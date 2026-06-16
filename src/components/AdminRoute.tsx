import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { toast } from 'sonner'
import { useAuthStore } from '@/features/auth'

function RedirectUnauthorized({ to }: { to: string }) {
  const navigate = useNavigate()
  useEffect(() => {
    toast.error('Access denied.', {
      description: 'You do not have permission to access this page.',
    })
    navigate(to, { replace: true })
  }, [navigate, to])
  return null
}

export default function AdminRoute() {
  const { isAuthenticated, isCheckingAuth, user } = useAuthStore()
  const location = useLocation()

  if (isCheckingAuth) return null

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (user?.role !== 'ADMIN') {
    return <RedirectUnauthorized to="/" />
  }

  return <Outlet />
}
