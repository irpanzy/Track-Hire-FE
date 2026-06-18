export { default as LoginFeature } from './components/LoginFeature'
export { default as RegisterFeature } from './components/RegisterFeature'
export { default as ForgotPasswordFeature } from './components/ForgotPasswordFeature'
export { default as ResetPasswordFeature } from './components/ResetPasswordFeature'
export { default as VerifyEmailFeature } from './components/VerifyEmailFeature'

export { useAuthStore } from './store/authStore'

export {
  useLogin,
  useGoogleLogin,
  useRegister,
  useForgotPassword,
  useResetPassword,
  useVerifyEmail,
} from './hooks/useAuthMutations'

export { authService } from './services/authService'

export { loginSchema, type LoginFormValues } from './schemas/loginSchema'
export {
  registerSchema,
  type RegisterFormValues,
} from './schemas/registerSchema'
export {
  forgotPasswordSchema,
  type ForgotPasswordFormValues,
} from './schemas/forgotPasswordSchema'
export {
  resetPasswordSchema,
  type ResetPasswordFormValues,
} from './schemas/resetPasswordSchema'

export type {
  User,
  LoginCredentials,
  RegisterCredentials,
  ForgotPasswordData,
  ResetPasswordData,
  LoginResponse,
  RegisterResponse,
  GenericResponse,
  AuthError,
} from './types/authType'
