export interface User {
  id: string
  name: string
  username: string
  email: string
  role: 'USER' | 'ADMIN'
  avatarUrl?: string | null
  isEmailVerified: boolean
  createdAt: string
}

export interface UpdateUserPayload {
  name?: string
  username?: string
}

export interface PaginationParams {
  page?: number
  limit?: number
  search?: string
  role?: 'USER' | 'ADMIN'
  sortBy?: 'name' | 'username' | 'email' | 'createdAt'
  order?: 'asc' | 'desc'
}

export interface Pagination {
  page: number
  limit: number
  total: number
  totalPages: number
}

export interface UsersResponse {
  message: string
  users: User[]
  pagination: Pagination
}

export interface UserResponse {
  message: string
  user: User
}

export interface AvatarResponse {
  message: string
  user: User
}

export interface DeleteResponse {
  message: string
}
