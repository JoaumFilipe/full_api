import { z } from 'zod'

const envSchema = z.object({
  PORT: z.string().transform((val) => Number(val)),
})

export const env = envSchema.parse(process.env)
