import { FastifyInstance } from 'fastify'

export const routes = (app: FastifyInstance) => {
  app.get('/test_cors', async (_, reply) => {
    reply.send({ message: 'CORS test' })
  })

  app.post('/', async (request, reply) => {
    reply.send(request.body)
  })
}
