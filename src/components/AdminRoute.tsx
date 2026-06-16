import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { toast } from 'sonner'
import { useAuthStore } from '@/features/auth'

function RedirectAccessDenied() {
  const navigate = useNavigate()
  useEffect(() => {
    toast.error("You don't have permission to access this page.", {
      description: 'Redirecting you to the dashboard.',
    })
    navigate('/', { replace: true })
  }, [navigate])
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
    return <RedirectAccessDenied />
  }

  return <Outlet />
}
