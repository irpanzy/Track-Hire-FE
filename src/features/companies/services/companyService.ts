import api from '@/lib/api'
import type {
  CreateCompanyPayload,
  UpdateCompanyPayload,
  CompaniesQueryParams,
  CompaniesResponse,
  CompanyResponse,
} from '../types/companyType'

const BASE_URL = '/companies'

// Create company
export const createCompany = async (
  payload: CreateCompanyPayload
): Promise<CompanyResponse> => {
  const { data } = await api.post<CompanyResponse>(BASE_URL, payload)
  return data
}

// List companies with filters and pagination
export const getCompanies = async (
  params: CompaniesQueryParams = {}
): Promise<CompaniesResponse> => {
  // Filter out empty values
  const filteredParams = Object.entries(params).reduce((acc, [key, value]) => {
    if (value !== '' && value !== undefined && value !== null) {
      acc[key] = value
    }
    return acc
  }, {} as Record<string, any>)

  const { data } = await api.get<CompaniesResponse>(BASE_URL, {
    params: filteredParams,
  })
  return data
}

// Get company by ID (with user's applications at this company)
export const getCompanyById = async (id: string): Promise<CompanyResponse> => {
  const { data } = await api.get<CompanyResponse>(`${BASE_URL}/${id}`)
  return data
}

// Update company
export const updateCompany = async (
  id: string,
  payload: UpdateCompanyPayload
): Promise<CompanyResponse> => {
  const { data} = await api.put<CompanyResponse>(`${BASE_URL}/${id}`, payload)
  return data
}

// Delete company (soft delete)
export const deleteCompany = async (
  id: string
): Promise<{ message: string }> => {
  const { data } = await api.delete<{ message: string }>(`${BASE_URL}/${id}`)
  return data
}

// Get deleted companies
export const getDeletedCompanies = async (
  params: CompaniesQueryParams = {}
): Promise<CompaniesResponse> => {
  const filteredParams = Object.entries(params).reduce((acc, [key, value]) => {
    if (value !== '' && value !== undefined && value !== null) {
      acc[key] = value
    }
    return acc
  }, {} as Record<string, any>)

  const { data } = await api.get<CompaniesResponse>(`${BASE_URL}/deleted/list`, {
    params: filteredParams,
  })
  return data
}

// Restore deleted company
export const restoreCompany = async (
  id: string
): Promise<CompanyResponse> => {
  const { data } = await api.post<CompanyResponse>(`${BASE_URL}/${id}/restore`)
  return data
}

// Permanently delete company
export const permanentDeleteCompany = async (
  id: string
): Promise<{ message: string }> => {
  const { data } = await api.delete<{ message: string }>(`${BASE_URL}/${id}/permanent`)
  return data
}
