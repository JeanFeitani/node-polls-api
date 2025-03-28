import { FastifyInstance } from 'fastify'

export const routes = (app: FastifyInstance) => {
  app.get('/test_cors', async (_, reply) => {
    reply.send({ message: 'CORS test' })
  })

  app.get('/', async (request, reply) => {
    return { message: 'Hello, app!' }
  })
}
