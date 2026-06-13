import { api } from '@/lib/api'
import type {
  LoginCredentials,
  RegisterCredentials,
  ForgotPasswordData,
  LoginResponse,
  RegisterResponse,
  GenericResponse,
  User,
} from '../types'

export const authService = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>('/auth/login', credentials)
    return response.data
  },

  googleLogin: async (idToken: string): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>('/auth/google', { idToken })
    return response.data
  },

  register: async (data: RegisterCredentials): Promise<RegisterResponse> => {
    const response = await api.post<RegisterResponse>('/auth/register', data)
    return response.data
  },

  verifyEmail: async (token: string): Promise<GenericResponse> => {
    const response = await api.post<GenericResponse>('/auth/verify-email', {
      token,
    })
    return response.data
  },

  forgotPassword: async (
    data: ForgotPasswordData
  ): Promise<GenericResponse> => {
    const response = await api.post<GenericResponse>(
      '/auth/forgot-password',
      data
    )
    return response.data
  },

  resetPassword: async (
    token: string,
    password: string
  ): Promise<GenericResponse> => {
    const response = await api.post<GenericResponse>('/auth/reset-password', {
      token,
      password,
    })
    return response.data
  },

  logout: async (): Promise<GenericResponse> => {
    const response = await api.post<GenericResponse>('/auth/logout')
    return response.data
  },

  getMe: async (): Promise<{ user: User }> => {
    const response = await api.get<{ user: User }>('/auth/me')
    return response.data
  },
}
