import { env } from './env'
import { app } from './app'
app
  .listen({
    host: '0.0.0.0',
    port: env.PORT, // Changed from env.PORT to a specific higher port
  })
  .then(() => {
    console.log('🚀 HTTP server running')
  })
