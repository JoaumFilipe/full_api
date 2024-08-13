import supertest from 'supertest'
import fastify from '../../app'

beforeAll(async () => {
  await fastify.ready()
})
afterAll(async () => {
  await fastify.close()
})

export const testServer = supertest(fastify.server)

/* Possivel solução para o problema */
// beforeAll((done) => {
//   fastify.ready()
//   done()
// })
// afterAll((done) => {
//   fastify.close()
//   done()
// })
