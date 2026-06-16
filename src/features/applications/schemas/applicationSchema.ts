import { z } from 'zod'

// Job Type Enum
export const jobTypeEnum = z.enum([
  'FULL_TIME',
  'PART_TIME',
  'CONTRACT',
  'INTERNSHIP',
  'FREELANCE',
  'REMOTE',
])

// Application Source Enum
export const applicationSourceEnum = z.enum([
  'LINKEDIN',
  'GLINTS',
  'JOBSTREET',
  'UPWORK',
  'INDEED',
  'WEBSITE',
  'INSTAGRAM',
  'X',
  'OTHER',
])

// Application Status Enum
export const applicationStatusEnum = z.enum([
  'APPLIED',
  'SCREENING',
  'INTERVIEW',
  'OFFER',
  'REJECTED',
  'WITHDRAWN',
  'ACCEPTED',
])

// Create Application Schema
export const createApplicationSchema = z.object({
  companyName: z
    .string()
    .min(1, 'Company name is required')
    .max(200, 'Company name must not exceed 200 characters'),
  companyWebsite: z
    .string()
    .url('Invalid URL format')
    .optional()
    .or(z.literal('')),
  companyLocation: z
    .string()
    .max(200, 'Location must not exceed 200 characters')
    .optional()
    .or(z.literal('')),
  position: z
    .string()
    .min(2, 'Position must be at least 2 characters')
    .max(200, 'Position must not exceed 200 characters'),
  jobType: jobTypeEnum,
  location: z
    .string()
    .max(200, 'Location must not exceed 200 characters')
    .optional()
    .or(z.literal('')),
  source: applicationSourceEnum,
  sourceUrl: z.string().url('Invalid URL format').optional().or(z.literal('')),
  description: z.string().optional().or(z.literal('')),
  requirements: z.string().optional().or(z.literal('')),
  salaryRange: z
    .string()
    .max(100, 'Salary range must not exceed 100 characters')
    .optional()
    .or(z.literal('')),
  status: applicationStatusEnum.optional(),
  appliedDate: z.string().optional(),
  deadlineDate: z.string().optional().or(z.literal('')),
  notes: z.string().optional().or(z.literal('')),
})

// Update Application Schema (all fields optional)
export const updateApplicationSchema = createApplicationSchema.partial()

// Extract URL Schema
export const extractUrlSchema = z.object({
  url: z.string().url('Invalid URL format'),
})

export type CreateApplicationFormValues = z.infer<
  typeof createApplicationSchema
>
export type UpdateApplicationFormValues = z.infer<
  typeof updateApplicationSchema
>
export type ExtractUrlFormValues = z.infer<typeof extractUrlSchema>
