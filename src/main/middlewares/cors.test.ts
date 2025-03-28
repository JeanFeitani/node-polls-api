import { app } from '../config/app' // Caminho correto para o arquivo app.ts
import request from 'supertest'

describe('CORS Middleware', () => {
  beforeAll(async () => {
    // Esperar que o Fastify esteja pronto
    await app.ready()
  })

  afterAll(async () => {
    // Fechar o servidor após os testes
    await app.close()
  })

  it('should set CORS headers for /test_cors route', async () => {
    const response = await request(app.server).get('/test_cors').expect(200) // Espera-se um status 200 OK

    // Verificar os cabeçalhos CORS na resposta
    expect(response.headers['access-control-allow-origin']).toBe('*')
    expect(response.headers['access-control-allow-headers']).toBe('*')
    expect(response.headers['access-control-allow-methods']).toBe('*')
  })
})
