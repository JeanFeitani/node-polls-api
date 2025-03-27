import { app } from './config/app'

app
  .listen({
    host: '0.0.0.0',
    port: 3333, // Changed from env.PORT to a specific higher port
  })
  .then(() => {
    console.log('🚀 HTTP server running')
  })
