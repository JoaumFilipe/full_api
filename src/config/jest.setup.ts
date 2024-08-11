import supertest from 'supertest'
import fastify from '../app'

export const testServer = supertest(fastify.server)
