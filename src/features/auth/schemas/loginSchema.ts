import { z } from 'zod'

export const loginSchema = z.object({
  emailOrUsername: z
    .string()
    .min(1, { message: 'Email or Username is required' }),
  password: z.string().min(1, { message: 'Password is required' }),
})

export type LoginFormValues = z.infer<typeof loginSchema>
