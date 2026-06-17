import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import {
  createCompany,
  updateCompany,
  deleteCompany,
  restoreCompany,
  permanentDeleteCompany,
} from '../services/companyService'
import { companiesKeys } from './useCompanies'
import type {
  CreateCompanyPayload,
  UpdateCompanyPayload,
} from '../types/companyType'

export const useCompanyMutations = () => {
  const queryClient = useQueryClient()

  // Create company mutation
  const createCompanyMutation = useMutation({
    mutationFn: (payload: CreateCompanyPayload) => createCompany(payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: companiesKeys.lists() })
      toast.success(data.message || 'Company created successfully')
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message ||
        error.message ||
        'Failed to create company'
      toast.error(message)
    },
  })

  // Update company mutation
  const updateCompanyMutation = useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string
      payload: UpdateCompanyPayload
    }) => updateCompany(id, payload),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: companiesKeys.lists() })
      queryClient.invalidateQueries({
        queryKey: companiesKeys.detail(variables.id),
      })
      toast.success(data.message || 'Company updated successfully')
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message ||
        error.message ||
        'Failed to update company'
      toast.error(message)
    },
  })

  // Delete company mutation (soft delete)
  const deleteCompanyMutation = useMutation({
    mutationFn: (id: string) => deleteCompany(id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: companiesKeys.lists() })
      queryClient.invalidateQueries({ queryKey: companiesKeys.deleted() })
      toast.success(data.message || 'Company deleted successfully')
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message ||
        error.message ||
        'Failed to delete company'
      toast.error(message)
    },
  })

  // Restore company mutation
  const restoreCompanyMutation = useMutation({
    mutationFn: (id: string) => restoreCompany(id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: companiesKeys.lists() })
      queryClient.invalidateQueries({ queryKey: companiesKeys.deleted() })
      toast.success(data.message || 'Company restored successfully')
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message ||
        error.message ||
        'Failed to restore company'
      toast.error(message)
    },
  })

  // Permanent delete company mutation
  const permanentDeleteCompanyMutation = useMutation({
    mutationFn: (id: string) => permanentDeleteCompany(id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: companiesKeys.deleted() })
      toast.success(data.message || 'Company permanently deleted')
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message ||
        error.message ||
        'Failed to permanently delete company'
      toast.error(message)
    },
  })

  return {
    createCompany: createCompanyMutation,
    updateCompany: updateCompanyMutation,
    deleteCompany: deleteCompanyMutation,
    restoreCompany: restoreCompanyMutation,
    permanentDeleteCompany: permanentDeleteCompanyMutation,
  }
}
