import { create } from 'zustand'
import { authService } from '../services/authService'
import type { User } from '../types'

interface AuthState {
  isAuthenticated: boolean
  user: User | null
  isCheckingAuth: boolean
  login: (user: User) => void
  logout: () => Promise<void>
  checkAuth: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  isCheckingAuth: true,

  login: (user) => set({ isAuthenticated: true, user }),

  logout: async () => {
    try {
      await authService.logout()
    } catch (error) {
      console.error('Failed to logout on server:', error)
    } finally {
      set({ isAuthenticated: false, user: null })
    }
  },

  checkAuth: async () => {
    try {
      const res = await authService.getMe()

      set({
        isAuthenticated: true,
        user: res.user,
      })
    } catch {
      set({ isAuthenticated: false, user: null })
    } finally {
      set({ isCheckingAuth: false })
    }
  },
}))
