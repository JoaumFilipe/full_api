import fastify from 'fastify'
import { cities_router } from './domains/cities'
import { validatorCompiler, serializerCompiler, ZodTypeProvider } from 'fastify-type-provider-zod'

const server = fastify().withTypeProvider<ZodTypeProvider>()

// Add schema validator and serializer
server.setValidatorCompiler(validatorCompiler)
server.setSerializerCompiler(serializerCompiler)

// Register the default route for the root path
server.get('/', (_, reply) => reply.code(200).send('route default'))

// Routes for cities with a 'v1' prefix
server.register(cities_router, { prefix: 'v1' })

export default server
