import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import { app } from './config/app'
import env from './config/env'

MongoHelper.connect(env.mongoUrl)
app
  .listen({
    host: '0.0.0.0',
    port: 3334, // Changed from env.PORT to a specific higher port
  })
  .then(() => {
    console.log('🚀 HTTP server running')
  })
