import { type AxiosError } from 'axios'

export interface User {
  id: string
  name: string
  username: string
  email: string
  role: 'USER' | 'ADMIN'
  avatarUrl?: string | null
  isEmailVerified?: boolean
  createdAt?: string
}

export interface LoginCredentials {
  emailOrUsername: string
  password: string
}

export interface RegisterCredentials {
  name: string
  username: string
  email: string
  password: string
  confirmPassword?: string
}

export interface ForgotPasswordData {
  email: string
}

export interface ResetPasswordData {
  password: string
}

export interface LoginResponse {
  message: string
  user: User
}

export interface RegisterResponse {
  message: string
  user: User
}

export interface GenericResponse {
  message: string
}

export type AuthError = AxiosError<{ message?: string }>
