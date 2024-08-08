import type { FastifyInstance } from 'fastify'
import { readyCity, createCity } from './controllers'
import { citySchema, ICitySchema } from './schemas'
import { formatErrorResponse } from '../../shared/error'

async function cities_router(fastify: FastifyInstance) {
  // Route to return all cities
  fastify.get('/cities', readyCity)

  // Route to create a new city
  fastify.post<{ Body: ICitySchema }>(
    '/cities',
    {
      schema: { body: citySchema },
      errorHandler: formatErrorResponse,
    },
    createCity
  )
}

export { cities_router }
