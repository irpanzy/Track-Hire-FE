import { createBrowserRouter } from 'react-router-dom'
import RootLayout from './layouts/RootLayout'
import AuthLayout from './layouts/AuthLayout'
import DashboardLayout from './layouts/DashboardLayout'
import ProtectedRoute from './components/ProtectedRoute'
import AdminRoute from './components/AdminRoute'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import VerifyEmail from './pages/auth/VerifyEmail'
import ForgotPassword from './pages/auth/ForgotPassword'
import ResetPassword from './pages/auth/ResetPassword'
import Dashboard from './pages/dashboard/Dashboard'
import Applications from './pages/applications/Applications'
import Companies from './pages/companies/Companies'
import Reminders from './pages/reminders/Reminders'
import Profile from './pages/profile/Profile'
import AdminUsers from './pages/admin/AdminUsers'
import RecycleBin from './pages/admin/RecycleBin'
import NotFound from './pages/NotFound'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          {
            path: 'login',
            element: <Login />,
          },
          {
            path: 'register',
            element: <Register />,
          },
          {
            path: 'forgot-password',
            element: <ForgotPassword />,
          },
          {
            path: 'reset-password',
            element: <ResetPassword />,
          },
          {
            path: 'verify-email',
            element: <VerifyEmail />,
          },
        ],
      },

      {
        element: <ProtectedRoute />,
        children: [
          {
            element: <DashboardLayout />,
            children: [
              {
                index: true,
                element: <Dashboard />,
              },
              {
                path: 'applications',
                element: <Applications />,
              },
              {
                path: 'companies',
                element: <Companies />,
              },
              {
                path: 'reminders',
                element: <Reminders />,
              },
              {
                path: 'profile',
                element: <Profile />,
              },
              {
                element: <AdminRoute />,
                children: [
                  {
                    path: 'admin/users',
                    element: <AdminUsers />,
                  },
                  {
                    path: 'admin/recycle-bin',
                    element: <RecycleBin />,
                  },
                ],
              },
            ],
          },
        ],
      },

      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
])
export default router
