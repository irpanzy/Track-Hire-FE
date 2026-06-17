import { z } from 'zod'

// Create Company Schema
export const createCompanySchema = z.object({
  name: z
    .string()
    .min(1, 'Company name is required')
    .max(200, 'Company name must be at most 200 characters'),
  website: z
    .string()
    .url('Must be a valid URL')
    .optional()
    .or(z.literal('')),
  location: z
    .string()
    .max(200, 'Location must be at most 200 characters')
    .optional()
    .or(z.literal('')),
})

export type CreateCompanyFormValues = z.infer<typeof createCompanySchema>

// Update Company Schema (all fields optional)
export const updateCompanySchema = z.object({
  name: z
    .string()
    .min(1, 'Company name is required')
    .max(200, 'Company name must be at most 200 characters')
    .optional(),
  website: z
    .string()
    .url('Must be a valid URL')
    .optional()
    .or(z.literal('')),
  location: z
    .string()
    .max(200, 'Location must be at most 200 characters')
    .optional()
    .or(z.literal('')),
})

export type UpdateCompanyFormValues = z.infer<typeof updateCompanySchema>
