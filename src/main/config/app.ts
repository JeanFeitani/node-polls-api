import Fastify from 'fastify'
import { router } from './routes'
import { middlewares } from './middlewares'

export const app = Fastify()

router(app)
middlewares(app)
