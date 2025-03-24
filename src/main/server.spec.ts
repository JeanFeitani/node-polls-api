import request from 'supertest'
import { app } from './server'

describe('Main', () => {
  beforeAll(async () => {
    await app.ready() // ⬅ Garante que o Fastify esteja pronto antes do teste
  })

  afterAll(async () => {
    await app.close() // ⬅ Fecha o servidor corretamente após os testes
  })

  it('Server should respond correctly', async () => {
    const response = await request(app.server) // ⬅ Usa `app.server` corretamente
      .post('/test')
      .send({ name: 'Jean Feitani' })

    expect(response.status).toBe(200)
    expect(response.body).toEqual({ name: 'Jean Feitani' })
  })
})
