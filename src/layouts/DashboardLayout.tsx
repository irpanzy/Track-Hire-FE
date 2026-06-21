import { useState, useEffect } from 'react'
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuthStore } from '@/features/auth'
import { toast } from 'sonner'
import {
  LayoutDashboard,
  Briefcase,
  Building2,
  Bell,
  LogOut,
  User,
  Menu,
  X,
  Shield,
  Trash2,
  Clock,
} from 'lucide-react'
import logoLight from '@/assets/logo-track-hire-light.png'
import retroAdminIcon from '@/assets/retro-admin.png'
import retroUserIcon from '@/assets/retro-user.png'

export default function DashboardLayout() {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())

  // Update clock every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const handleLogout = () => {
    logout()
    toast.success('Signed out successfully')
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
      ? [
          { name: 'Users', path: '/admin/users', icon: Shield },
          { name: 'Recycle Bin', path: '/admin/recycle-bin', icon: Trash2 },
        ]
      : []

  const getPageTitle = () => {
    const path = location.pathname
    if (path === '/') return 'Dashboard'
    if (path === '/admin/users') return 'User Management'
    if (path === '/admin/recycle-bin') return 'Recycle Bin'
    const item = [...navItems, ...adminNavItems].find(
      (i) => i.path !== '/' && path.startsWith(i.path)
    )
    return item ? item.name : 'Not Found'
  }

  return (
    <div className="gradient-mesh flex h-screen overflow-hidden text-zinc-100">
      {/* Sidebar for Desktop */}
      <aside className="hidden border-r border-white/[0.06] bg-white/[0.03] backdrop-blur-2xl md:flex md:w-64 md:flex-col">
        {/* Brand */}
        <div className="flex h-16 items-center gap-2 border-b border-white/[0.06] px-6">
          <img src={logoLight} alt="Track Hire" className="h-12 w-auto" />
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
                      : 'text-zinc-400 hover:bg-white/[0.04] hover:text-white'
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
              <div className="my-2 border-t border-white/[0.06]" />
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
                          : 'text-zinc-400 hover:bg-white/[0.04] hover:text-white'
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
        <div className="border-t border-white/[0.06] bg-white/[0.02] p-4">
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
      <AnimatePresence>
        {sidebarOpen && (
          <div className="fixed inset-0 z-45 flex md:hidden">
            {/* Overlay with fade animation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setSidebarOpen(false)}
            />

            {/* Sidebar with slide animation */}
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative flex w-64 max-w-xs flex-col border-r border-white/[0.06] bg-zinc-900/80 p-4 backdrop-blur-2xl"
            >
              <div className="mb-8 flex items-center justify-between">
                <img src={logoLight} alt="Track Hire" className="h-12 w-auto" />
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="cursor-pointer rounded-lg p-1 text-zinc-400 hover:bg-white/[0.04] hover:text-white"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <nav className="flex-1 space-y-1">
                {navItems.map((item, index) => {
                  const Icon = item.icon
                  return (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <NavLink
                        to={item.path}
                        onClick={() => setSidebarOpen(false)}
                        className={({ isActive }) =>
                          `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all ${
                            isActive
                              ? 'bg-indigo-650 text-white shadow-lg'
                              : 'text-zinc-400 hover:bg-white/[0.04] hover:text-white'
                          }`
                        }
                      >
                        <Icon className="h-5 w-5" />
                        {item.name}
                      </NavLink>
                    </motion.div>
                  )
                })}

                {/* Admin Section — mobile */}
                {adminNavItems.length > 0 && (
                  <>
                    <div className="my-2 border-t border-white/[0.06]" />
                    <p className="px-4 pb-1 text-[10px] font-semibold tracking-widest text-zinc-600 uppercase">
                      Admin
                    </p>
                    {adminNavItems.map((item, index) => {
                      const Icon = item.icon
                      return (
                        <motion.div
                          key={item.name}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            delay: (navItems.length + index) * 0.05,
                          }}
                        >
                          <NavLink
                            to={item.path}
                            onClick={() => setSidebarOpen(false)}
                            className={({ isActive }) =>
                              `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all ${
                                isActive
                                  ? 'bg-indigo-500/15 text-indigo-300 ring-1 ring-indigo-500/20'
                                  : 'text-zinc-400 hover:bg-white/[0.04] hover:text-white'
                              }`
                            }
                          >
                            <Icon className="h-5 w-5" />
                            {item.name}
                          </NavLink>
                        </motion.div>
                      )
                    })}
                  </>
                )}
              </nav>

              <div className="border-t border-white/[0.06] pt-4">
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
            </motion.aside>
          </div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Navbar */}
        <header className="z-10 flex h-16 shrink-0 items-center justify-between border-b border-white/[0.06] bg-white/[0.03] px-6 backdrop-blur-2xl">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="cursor-pointer rounded-lg p-1.5 text-zinc-400 hover:bg-white/[0.04] hover:text-white md:hidden"
            >
              <Menu className="h-6 w-6" />
            </button>
            <h2 className="text-xl font-bold tracking-tight text-white">
              {getPageTitle()}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            {/* Retro Digital Clock */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="border-retro-orange/30 hidden items-center gap-2 rounded-lg border-2 bg-zinc-950 px-3 py-1.5 sm:flex"
            >
              <Clock className="text-retro-orange h-4 w-4" />
              <div className="text-retro-cyan font-mono text-sm font-bold tracking-wider">
                {currentTime.toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                  hour12: false,
                })}
              </div>
            </motion.div>

            {/* User Badge */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="hidden items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 py-1.5 backdrop-blur-md lg:flex"
            >
              <div className="flex h-7 w-7 items-center justify-center overflow-hidden rounded-full border border-indigo-500/30 bg-indigo-500/20">
                {user?.avatarUrl ? (
                  <img
                    src={user.avatarUrl}
                    alt={user.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-xs font-bold text-indigo-300">
                    {user?.name?.[0]?.toUpperCase() || 'U'}
                  </span>
                )}
              </div>
              <div className="min-w-0">
                <p className="truncate text-xs font-semibold text-white">
                  {user?.name || 'User'}
                </p>
                <div className="flex items-center gap-1">
                  <img
                    src={
                      user?.role === 'ADMIN' ? retroAdminIcon : retroUserIcon
                    }
                    alt={user?.role === 'ADMIN' ? 'Admin' : 'User'}
                    className="h-3 w-3"
                  />
                  <p className="truncate text-[10px] text-zinc-500">
                    {user?.role === 'ADMIN' ? 'Admin' : 'User'}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </header>

        {/* Content Outlet */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mx-auto max-w-7xl"
          >
            <Outlet />
          </motion.div>
        </main>
      </div>
    </div>
  )
}
