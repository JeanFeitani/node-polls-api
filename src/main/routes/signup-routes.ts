import type { FastifyInstance } from 'fastify'
import { makeSignUpController } from '../factories/signup'
import { fastifyAdpter } from './adapters/fastify-routes-adapter'

export const signUpRoutes = (app: FastifyInstance) => {
  app.post('/signup', fastifyAdpter(makeSignUpController()))
}
