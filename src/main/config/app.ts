import Fastify from 'fastify'
import { cors } from '../middleware/cors'

export const app = Fastify()

app.addHook('onRequest', cors)

// ✅ Registra a rota uma única vez
app.get('/test_cors', async (_, reply) => {
  reply.send()
})
