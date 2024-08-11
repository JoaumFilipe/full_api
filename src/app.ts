import Fastify from 'fastify'
import { cities_router } from './domains/cities/routers'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { validatorCompiler, serializerCompiler } from 'fastify-type-provider-zod'

const fastify = Fastify().withTypeProvider<ZodTypeProvider>()

// Add schema validator and serializer
fastify.setValidatorCompiler(validatorCompiler)
fastify.setSerializerCompiler(serializerCompiler)

// Register the default route for the root path
fastify.get('/', (_, reply) => reply.code(200).send('route default'))

// Routes for cities with a 'v1' prefix
fastify.register(cities_router, { prefix: 'v1' })

export default fastify
