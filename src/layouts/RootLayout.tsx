import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { useAuthStore } from '@/features/auth'
import { Toaster } from '../components/ui/sonner'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
})

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || ''

export default function RootLayout() {
  const checkAuth = useAuthStore((state) => state.checkAuth)

  useEffect(() => {
    checkAuth()

    document.documentElement.classList.add('dark')
  }, [checkAuth])

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <QueryClientProvider client={queryClient}>
        <div className="selection:bg-indigo-650/15 min-h-screen bg-zinc-950 text-zinc-100 antialiased">
          <Outlet />
        </div>
        <Toaster closeButton position="top-center" richColors />
      </QueryClientProvider>
    </GoogleOAuthProvider>
  )
}
