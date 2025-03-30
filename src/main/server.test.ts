import request from 'supertest'
import { app } from './config/app'

describe('Main', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Server should respond correctly', async () => {
    const response = await request(app.server)
      .post('/')
      .send({ name: 'Jean Feitani' })

    expect(response.status).toBe(200)
    expect(response.body).toEqual({ name: 'Jean Feitani' })
  })
})
