import type { FastifyRequest, FastifyReply } from 'fastify'
import type { IBodyCitySchema, IParamsCitySchema, IQueryCitySchema } from './schemas'

// Handler to return all cities
// This endpoint returns a success response with status code 200
export const readCity = (
  request: FastifyRequest<{ Querystring: IQueryCitySchema }>,
  reply: FastifyReply
) => {
  // const search = request.query.search
  // if (search) return reply.code(200).send(search)
  return reply.code(200).send(request.query)
}

// Handler to create a new city
// This endpoint returns a success response with status code 201
export const createCity = (
  request: FastifyRequest<{ Body: IBodyCitySchema }>,
  reply: FastifyReply
) => {
  return reply.code(201).send(request.body)
}

// Handler to update a new city
// This endpoint returns a success response with status code 204
export const updateCity = (
  _request: FastifyRequest<{ Body: IBodyCitySchema; Params: IParamsCitySchema }>,
  reply: FastifyReply
) => {
  return reply.code(204).send()
}

// Handler to delete a city
// This endpoint returns a success response with status code 200
export const deleteCity = (
  request: FastifyRequest<{ Params: IParamsCitySchema }>,
  reply: FastifyReply
) => {
  return reply.code(200).send(`${request.params.id}: Deleted`)
}
