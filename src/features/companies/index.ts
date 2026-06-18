// Export components
export { default as CompaniesListFeature } from './components/CompaniesListFeature'
export { default as CompaniesRecycleBinFeature } from './components/CompaniesRecycleBinFeature'
export { default as CompanyFormDialog } from './components/CompanyFormDialog'
export { default as CompanyDetailDialog } from './components/CompanyDetailDialog'
export { default as ConfirmDeleteDialog } from './components/ConfirmDeleteDialog'
export { default as ConfirmRestoreDialog } from './components/ConfirmRestoreDialog'
export { default as ConfirmPermanentDeleteDialog } from './components/ConfirmPermanentDeleteDialog'
export { default as CompaniesFilters } from './components/CompaniesFilters'

// Export hooks
export {
  useCompanies,
  useCompany,
  useDeletedCompanies,
  companiesKeys,
} from './hooks/useCompanies'
export { useCompanyMutations } from './hooks/useCompanyMutations'

// Export types
export type {
  Company,
  CompanyApplication,
  CreateCompanyPayload,
  UpdateCompanyPayload,
  CompaniesQueryParams,
  CompaniesResponse,
  CompanyResponse,
} from './types/companyType'

// Export schemas
export {
  createCompanySchema,
  updateCompanySchema,
  type CreateCompanyFormValues,
  type UpdateCompanyFormValues,
} from './schemas/companySchema'

// Export services
export {
  createCompany,
  getCompanies,
  getCompanyById,
  updateCompany,
  deleteCompany,
  getDeletedCompanies,
  restoreCompany,
  permanentDeleteCompany,
} from './services/companyService'
