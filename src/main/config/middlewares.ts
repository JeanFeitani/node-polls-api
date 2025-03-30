import type { FastifyInstance } from 'fastify'
import { contentTypeMiddleware } from '../middlewares/content-type'
import { cors } from '../middlewares/cors'

export const middlewares = async (app: FastifyInstance) => {
  app.addHook('onRequest', cors)
  app.addHook('onSend', contentTypeMiddleware)
}
