import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import { app } from './config/app'
import env from './config/env'

async function startServer() {
  try {
    await MongoHelper.connect(env.mongoUrl)
    console.log('✅ Conexão com o MongoDB estabelecida!')

    await app.listen({
      host: '0.0.0.0',
      port: 3333, // Changed from env.PORT to a specific higher port
    })

    console.log('🚀 HTTP server running on port 3333')
  } catch (error) {
    console.error('❌ Falha ao iniciar o servidor:', error)
    process.exit(1) // Exit process on failure
  }
}

startServer()
