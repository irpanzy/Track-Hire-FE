import { useMutation, useQuery } from '@tanstack/react-query'
import { useNavigate, useLocation } from 'react-router-dom'
import { toast } from 'sonner'
import { authService } from '../services/authService'
import { useAuthStore } from '../store/authStore'
import type {
  LoginResponse,
  RegisterResponse,
  GenericResponse,
  AuthError,
  User,
  LoginCredentials,
  RegisterCredentials,
  ForgotPasswordData,
  ResetPasswordData,
} from '../types/authType'

export function useLogin(
  onSuccessCallback?: (user: User) => void,
  onErrorCallback?: (error: AuthError) => void
) {
  const { login: setAuthUser } = useAuthStore()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'

  return useMutation<LoginResponse, AuthError, LoginCredentials>({
    mutationFn: (data: LoginCredentials) => authService.login(data),
    onSuccess: (data) => {
      setAuthUser(data.user)
      toast.success(`Welcome back, ${data.user.name}!`)
      if (onSuccessCallback) {
        onSuccessCallback(data.user)
      } else {
        navigate(from, { replace: true })
      }
    },
    onError: (error: AuthError) => {
      if (onErrorCallback) onErrorCallback(error)
    },
  })
}

export function useGoogleLogin(
  onSuccessCallback?: (user: User) => void,
  onErrorCallback?: (error: AuthError) => void
) {
  const { login: setAuthUser } = useAuthStore()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'

  return useMutation<LoginResponse, AuthError, string>({
    mutationFn: (idToken: string) => authService.googleLogin(idToken),
    onSuccess: (data) => {
      setAuthUser(data.user)
      toast.success(`Welcome back, ${data.user.name}!`)
      if (onSuccessCallback) {
        onSuccessCallback(data.user)
      } else {
        navigate(from, { replace: true })
      }
    },
    onError: (error: AuthError) => {
      if (onErrorCallback) onErrorCallback(error)
    },
  })
}

export function useRegister(
  onSuccessCallback?: (data: RegisterResponse) => void,
  onErrorCallback?: (error: AuthError) => void
) {
  return useMutation<RegisterResponse, AuthError, RegisterCredentials>({
    mutationFn: (data: RegisterCredentials) => authService.register(data),
    onSuccess: (data) => {
      if (onSuccessCallback) onSuccessCallback(data)
    },
    onError: (error: AuthError) => {
      if (onErrorCallback) onErrorCallback(error)
    },
  })
}

export function useForgotPassword(
  onSuccessCallback?: (data: GenericResponse) => void,
  onErrorCallback?: (error: AuthError) => void
) {
  return useMutation<GenericResponse, AuthError, ForgotPasswordData>({
    mutationFn: (data: ForgotPasswordData) => authService.forgotPassword(data),
    onSuccess: (data) => {
      if (onSuccessCallback) onSuccessCallback(data)
    },
    onError: (error: AuthError) => {
      if (onErrorCallback) onErrorCallback(error)
    },
  })
}

export function useResetPassword(
  token: string | null,
  onSuccessCallback?: (data: GenericResponse) => void,
  onErrorCallback?: (error: AuthError) => void
) {
  return useMutation<GenericResponse, AuthError, ResetPasswordData>({
    mutationFn: async (data: ResetPasswordData) => {
      if (!token) throw new Error('Reset token is missing.')
      return authService.resetPassword(token, data.password)
    },
    onSuccess: (data) => {
      if (onSuccessCallback) onSuccessCallback(data)
    },
    onError: (error: AuthError) => {
      if (onErrorCallback) onErrorCallback(error)
    },
  })
}

export function useVerifyEmail(token: string | null) {
  return useQuery<GenericResponse, AuthError>({
    queryKey: ['verifyEmail', token],
    queryFn: async () => {
      if (!token) throw new Error('Verification token is missing.')
      return authService.verifyEmail(token)
    },
    retry: false,
    refetchOnWindowFocus: false,
  })
}
