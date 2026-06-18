export interface AdminUser {
  id: string
  name: string
  username: string
  email: string
  role: 'USER' | 'ADMIN'
  avatarUrl: string | null
  isEmailVerified: boolean
  createdAt: string
}

export interface DeletedUser extends AdminUser {
  deletedAt: string
}

export interface Pagination {
  page: number
  limit: number
  total: number
  totalPages: number
}

export interface UsersResponse {
  message: string
  users: AdminUser[]
  pagination: Pagination
}

export interface DeletedUsersResponse {
  message: string
  users: DeletedUser[]
  pagination: Pagination
}

export interface UserResponse {
  message: string
  user: AdminUser
}

export interface UsersQueryParams {
  page?: number
  limit?: number
  search?: string
  role?: 'USER' | 'ADMIN' | ''
  sortBy?: 'name' | 'username' | 'email' | 'createdAt'
  order?: 'asc' | 'desc'
}
