import type { FastifyInstance } from 'fastify'
import { readCity, createCity, updateCity, deleteCity } from './controllers'
import type { IBodyCitySchema, IQueryCitySchema, IParamsCitySchema } from './schemas'
import { bodyCitySchema, queryCitySchema, paramsCitySchema } from './schemas'
import { formatErrorResponse } from '../../shared/error'

async function cities_router(fastify: FastifyInstance) {
  // Route to return all cities
  fastify.get<{ Querystring: IQueryCitySchema }>(
    '/cities',
    {
      schema: {
        querystring: queryCitySchema,
      },
      errorHandler: formatErrorResponse,
    },
    readCity
  )

  // Route to create a new city
  fastify.post<{ Body: IBodyCitySchema }>(
    '/cities',
    {
      schema: {
        body: bodyCitySchema,
      },
      errorHandler: formatErrorResponse,
    },
    createCity
  )

  // Route to update in city
  fastify.put<{ Body: IBodyCitySchema; Params: IParamsCitySchema }>(
    '/cities/:id',
    {
      schema: {
        body: bodyCitySchema,
        params: paramsCitySchema,
      },
      errorHandler: formatErrorResponse,
    },
    updateCity
  )

  // Route to delete a city
  fastify.delete<{ Params: IParamsCitySchema }>(
    '/cities/:id',
    {
      schema: {
        params: paramsCitySchema,
      },
      errorHandler: formatErrorResponse,
    },
    deleteCity
  )
}

export { cities_router }
