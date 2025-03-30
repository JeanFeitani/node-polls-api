import type { FastifyInstance } from 'fastify'

export const signUpRoutes = (app: FastifyInstance) => {
  app.post('/signup', async (_, reply) => {
    reply.send({ message: 'ok' })
  })
}
