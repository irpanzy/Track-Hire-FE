import { useQuery } from '@tanstack/react-query'
import { getCompanies, getCompanyById, getDeletedCompanies } from '../services/companyService'
import type { CompaniesQueryParams } from '../types/companyType'

// Query key factory
export const companiesKeys = {
  all: ['companies'] as const,
  lists: () => [...companiesKeys.all, 'list'] as const,
  list: (params: CompaniesQueryParams) =>
    [...companiesKeys.lists(), params] as const,
  details: () => [...companiesKeys.all, 'detail'] as const,
  detail: (id: string) => [...companiesKeys.details(), id] as const,
  deleted: () => [...companiesKeys.all, 'deleted'] as const,
  deletedList: (params: CompaniesQueryParams) =>
    [...companiesKeys.deleted(), params] as const,
}

// List companies with filters and pagination
export const useCompanies = (params: CompaniesQueryParams = {}) => {
  return useQuery({
    queryKey: companiesKeys.list(params),
    queryFn: () => getCompanies(params),
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}

// Get single company by ID
export const useCompany = (id: string) => {
  return useQuery({
    queryKey: companiesKeys.detail(id),
    queryFn: () => getCompanyById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}

// List deleted companies
export const useDeletedCompanies = (params: CompaniesQueryParams = {}) => {
  return useQuery({
    queryKey: companiesKeys.deletedList(params),
    queryFn: () => getDeletedCompanies(params),
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}
