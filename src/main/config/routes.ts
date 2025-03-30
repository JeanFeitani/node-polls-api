import type { FastifyInstance } from 'fastify'
import { routes } from '../routes/testing'
import { signUpRoutes } from '../routes/signup-routes'

export const router = async (app: FastifyInstance) => {
  app.register(routes)
  app.register(signUpRoutes, { prefix: '/api' })
}
