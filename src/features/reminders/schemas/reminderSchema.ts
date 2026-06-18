import { z } from 'zod'

// Create Reminder Schema
export const createReminderSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(200, 'Title must not exceed 200 characters'),
  description: z.string().optional().or(z.literal('')),
  reminderDate: z
    .string()
    .min(1, 'Reminder date is required')
    .refine((val) => !isNaN(Date.parse(val)), {
      message: 'Invalid date format',
    }),
  applicationId: z.string().optional().or(z.literal('')),
})

// Update Reminder Schema (all optional)
export const updateReminderSchema = z.object({
  title: z
    .string()
    .min(1, 'Title must not be empty')
    .max(200, 'Title must not exceed 200 characters')
    .optional(),
  description: z.string().optional().or(z.literal('')),
  reminderDate: z
    .string()
    .refine((val) => !val || !isNaN(Date.parse(val)), {
      message: 'Invalid date format',
    })
    .optional(),
  isDone: z.boolean().optional(),
  applicationId: z.string().optional().or(z.literal('')),
})

export type CreateReminderFormValues = z.infer<typeof createReminderSchema>
export type UpdateReminderFormValues = z.infer<typeof updateReminderSchema>
