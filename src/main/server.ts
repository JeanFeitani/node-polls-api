import { fastify } from 'fastify'

export const app = fastify()

app
  .listen({
    host: '0.0.0.0',
    port: 3333, // Changed from env.PORT to a specific higher port
  })
  .then(() => {
    console.log('🚀 HTTP server running')
  })

app.post('/test', async (request, reply) => {
  return request.body
})
