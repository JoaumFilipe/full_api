import { z } from 'zod'

export const citySchema = z
  .object({
    city: z.string().min(3),
    state: z.string().min(2).max(2).nullable(),
  })
  .strict()

export type ICitySchema = z.infer<typeof citySchema>
