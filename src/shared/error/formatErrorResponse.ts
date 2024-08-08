import { FastifyError, FastifyReply, FastifyRequest } from 'fastify'
import { ZodError } from 'zod'

// Return statusCode 500 for non-Zod errors
// Handles ZOD errors validation that returns a custom object with statusCode 400
export const formatErrorResponse = (err: FastifyError, _: FastifyRequest, reply: FastifyReply) => {
  if (!(err instanceof ZodError)) return reply.code(500).send()

  const error = err.errors.map((el) => {
    return {
      statusCode: err.statusCode,
      error: err.code,
      path: el.path,
      message: el.message,
    }
  })

  return reply.code(400).send(error)
}
