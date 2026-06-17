// Company types based on API contract

export interface Company {
  id: string
  name: string
  website: string | null
  location: string | null
  createdAt: string
  updatedAt: string
  deletedAt?: string | null
  applications?: CompanyApplication[]
}

export interface CompanyApplication {
  id: string
  position: string
  jobType: string
  status: string
  appliedDate: string
  createdAt: string
}

export interface CreateCompanyPayload {
  name: string
  website?: string
  location?: string
}

export interface UpdateCompanyPayload {
  name?: string
  website?: string
  location?: string
}

export interface CompaniesQueryParams {
  page?: number
  limit?: number
  search?: string
  userOnly?: boolean
  sortBy?: 'name' | 'createdAt'
  order?: 'asc' | 'desc'
}

export interface CompaniesResponse {
  message: string
  companies: Company[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export interface CompanyResponse {
  message: string
  company: Company
}
