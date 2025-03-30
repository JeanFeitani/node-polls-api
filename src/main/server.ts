import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import { app } from './config/app'
import env from './config/env'
;(async function () {
  await MongoHelper.connect(env.mongoUrl)
  console.log('Conexão com o MongoDB estabelecida!')
})()

app
  .listen({
    host: '0.0.0.0',
    port: 3333, // Changed from env.PORT to a specific higher port
  })
  .then(() => {
    console.log('🚀 HTTP server running')
  })
