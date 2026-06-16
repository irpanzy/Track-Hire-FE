import { useState } from 'react'
import {
  Link,
  NavLink,
  Outlet,
  useNavigate,
  useLocation,
} from 'react-router-dom'
import { useAuthStore } from '@/features/auth'
import {
  LayoutDashboard,
  Briefcase,
  Building2,
  Bell,
  LogOut,
  User,
  Menu,
  X,
  Plus,
  Shield,
} from 'lucide-react'
import { toast } from 'sonner'

export default function DashboardLayout() {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = () => {
    logout()
    toast.success('Signed out successfully.', {
      description: 'You have been logged out of your account.',
    })
    navigate('/login')
  }

  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Applications', path: '/applications', icon: Briefcase },
    { name: 'Companies', path: '/companies', icon: Building2 },
    { name: 'Reminders', path: '/reminders', icon: Bell },
    { name: 'Profile', path: '/profile', icon: User },
  ]

  const adminNavItems =
    user?.role === 'ADMIN'
      ? [{ name: 'Users', path: '/admin/users', icon: Shield }]
      : []

  const getPageTitle = () => {
    const path = location.pathname
    if (path === '/') return 'Dashboard'
    if (path === '/admin/users') return 'User Management'
    const item = [...navItems, ...adminNavItems].find(
      (i) => i.path !== '/' && path.startsWith(i.path)
    )
    return item ? item.name : 'Not Found'
  }

  return (
    <div className="flex h-screen overflow-hidden bg-zinc-950 text-zinc-100">
      {/* Sidebar for Desktop */}
      <aside className="border-zinc-850 hidden border-r bg-zinc-900 md:flex md:w-64 md:flex-col">
        {/* Brand */}
        <div className="border-zinc-850 flex h-16 items-center gap-2 border-b px-6">
          <Briefcase className="h-6 w-6 text-indigo-400" />
          <span className="text-lg font-extrabold tracking-wider text-white">
            TRACK HIRE
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 overflow-y-auto px-4 py-6">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `group flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-indigo-650 text-white shadow-lg shadow-indigo-600/20'
                      : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
                  }`
                }
              >
                <Icon className="h-5 w-5 shrink-0" />
                {item.name}
              </NavLink>
            )
          })}

          {/* Admin Section */}
          {adminNavItems.length > 0 && (
            <>
              <div className="my-2 border-t border-zinc-800" />
              <p className="px-4 pb-1 text-[10px] font-semibold tracking-widest text-zinc-600 uppercase">
                Admin
              </p>
              {adminNavItems.map((item) => {
                const Icon = item.icon
                return (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    className={({ isActive }) =>
                      `group flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? 'bg-indigo-500/15 text-indigo-300 shadow-lg ring-1 shadow-indigo-600/10 ring-indigo-500/20'
                          : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
                      }`
                    }
                  >
                    <Icon className="h-5 w-5 shrink-0" />
                    {item.name}
                  </NavLink>
                )
              })}
            </>
          )}
        </nav>

        {/* User profile / Logout */}
        <div className="border-zinc-850 border-t bg-zinc-900/50 p-4">
          <div className="mb-3 flex items-center gap-3 px-2 py-2">
            <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-indigo-500/30 bg-indigo-500/20">
              {user?.avatarUrl ? (
                <img
                  src={user.avatarUrl}
                  alt={user.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="font-bold text-indigo-300">
                  {user?.name?.[0]?.toUpperCase() || 'U'}
                </span>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-white">
                {user?.name || 'User'}
              </p>
              <p className="truncate text-xs text-zinc-500">
                {user?.email || 'user@example.com'}
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex w-full cursor-pointer items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium text-red-400 transition-colors hover:bg-red-500/10 hover:text-red-300"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile Drawer (Overlay & Sidebar) */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-45 flex md:hidden">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setSidebarOpen(false)}
          />

          <aside className="border-zinc-850 relative flex w-64 max-w-xs flex-col border-r bg-zinc-900 p-4">
            <div className="mb-8 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Briefcase className="h-6 w-6 text-indigo-400" />
                <span className="text-lg font-extrabold tracking-wider text-white">
                  TRACK HIRE
                </span>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="cursor-pointer rounded-lg p-1 text-zinc-400 hover:bg-zinc-800 hover:text-white"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <nav className="flex-1 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon
                return (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    onClick={() => setSidebarOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all ${
                        isActive
                          ? 'bg-indigo-650 text-white shadow-lg'
                          : 'hover:bg-zinc-850 text-zinc-400 hover:text-white'
                      }`
                    }
                  >
                    <Icon className="h-5 w-5" />
                    {item.name}
                  </NavLink>
                )
              })}

              {/* Admin Section — mobile */}
              {adminNavItems.length > 0 && (
                <>
                  <div className="my-2 border-t border-zinc-800" />
                  <p className="px-4 pb-1 text-[10px] font-semibold tracking-widest text-zinc-600 uppercase">
                    Admin
                  </p>
                  {adminNavItems.map((item) => {
                    const Icon = item.icon
                    return (
                      <NavLink
                        key={item.name}
                        to={item.path}
                        onClick={() => setSidebarOpen(false)}
                        className={({ isActive }) =>
                          `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all ${
                            isActive
                              ? 'bg-indigo-500/15 text-indigo-300 ring-1 ring-indigo-500/20'
                              : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
                          }`
                        }
                      >
                        <Icon className="h-5 w-5" />
                        {item.name}
                      </NavLink>
                    )
                  })}
                </>
              )}
            </nav>

            <div className="border-zinc-850 border-t pt-4">
              <div className="mb-3 flex items-center gap-3 px-2 py-2">
                <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-indigo-500/30 bg-indigo-500/20">
                  {user?.avatarUrl ? (
                    <img
                      src={user.avatarUrl}
                      alt={user.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="font-bold text-indigo-300">
                      {user?.name?.[0]?.toUpperCase() || 'U'}
                    </span>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-white">
                    {user?.name || 'User'}
                  </p>
                  <p className="truncate text-xs text-zinc-500">
                    {user?.email || 'user@example.com'}
                  </p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="flex w-full cursor-pointer items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium text-red-400 transition-colors hover:bg-red-500/10 hover:text-red-300"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Navbar */}
        <header className="border-zinc-850 z-10 flex h-16 shrink-0 items-center justify-between border-b bg-zinc-900 px-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="cursor-pointer rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-800 hover:text-white md:hidden"
            >
              <Menu className="h-6 w-6" />
            </button>
            <h2 className="text-xl font-bold tracking-tight text-white">
              {getPageTitle()}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            {/* Quick action button */}
            <Link
              to="/applications"
              className="hidden cursor-pointer items-center gap-2 rounded-md bg-indigo-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-lg shadow-indigo-600/15 transition-all hover:bg-indigo-500 active:scale-95 sm:flex"
            >
              <Plus className="h-3.5 w-3.5" />
              Add Application
            </Link>

            {/* Notification button */}
            <button className="relative cursor-pointer rounded-lg p-2 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white">
              <span className="absolute top-1.5 right-1.5 h-2 w-2 animate-pulse rounded-full bg-indigo-500" />
              <Bell className="h-5 w-5" />
            </button>
          </div>
        </header>

        {/* Content Outlet */}
        <main className="flex-1 overflow-y-auto bg-zinc-950 p-6 md:p-8">
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
