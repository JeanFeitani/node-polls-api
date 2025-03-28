import Fastify from 'fastify'
import { contentTypeMiddleware } from '../middlewares/content-type'
import { cors } from '../middlewares/cors'
import { routes } from './routes'

export const app = Fastify()
app.register(routes)

app.addHook('onRequest', cors)
app.addHook('onSend', contentTypeMiddleware)
