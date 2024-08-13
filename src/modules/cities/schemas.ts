import { z } from 'zod'

// Schema for validate request Body
export const bodyCitySchema = z
  .object({
    city: z.string().min(3),
    state: z.string().min(2).max(2).nullable(),
  })
  .strict()
export type IBodyCitySchema = z.infer<typeof bodyCitySchema>

// Schema for validate request Query
export const queryCitySchema = z
  .object({
    page: z.coerce.number().positive().int().optional(),
    limit: z.coerce.number().positive().int().optional(),
    filter: z.string().min(1).optional(),
    search: z.string().min(1).optional(),
  })
  .strict()
export type IQueryCitySchema = z.infer<typeof queryCitySchema>

// Schema for validate request Params
export const paramsCitySchema = z.object({
  id: z.coerce.number().int().positive(),
})
export type IParamsCitySchema = z.infer<typeof paramsCitySchema>
