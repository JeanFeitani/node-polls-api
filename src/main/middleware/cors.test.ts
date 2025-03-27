import request from 'supertest'
import { app } from '../config/app'

describe('CORS Middleware', () => {
  beforeAll(async () => {
    await app.ready() // ✅ Garante que o Fastify está pronto antes do teste
  })

  afterAll(async () => {
    await app.close() // ✅ Fecha o servidor ao final dos testes
  })

  it('Should enable CORS', async () => {
    await request(app.server)
      .get('/test_cors') // ✅ Apenas testa a rota que já existe
      .expect(200) // ✅ Verifica se a rota está funcionando corretamente
      .expect('access-control-allow-origin', '*')
      .expect('access-control-allow-headers', '*')
      .expect('access-control-allow-methods', '*')
  })
})
