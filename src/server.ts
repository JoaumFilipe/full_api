import fastify from './app'
import { env } from './config/env'

fastify.listen({ port: env.PORT || 3333, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    console.log(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})
