import type { FastifyRequest, FastifyReply, FastifyError } from 'fastify'
import type { ICitySchema } from './schemas'
import { ZodError } from 'zod'

// Handler to return all cities
// This endpoint returns a success response with status code 200
export const readyCity = (_: FastifyRequest, reply: FastifyReply) => {
  return reply.code(200).send({ Controller: 'Success' })
}

// Handler to create a new city
// This endpoint returns a success response with status code 201
export const createCity = (request: FastifyRequest<{ Body: ICitySchema }>, reply: FastifyReply) => {
  return reply.code(201).send(request.body)
}
