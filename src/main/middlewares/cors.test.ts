import { app } from '../config/app'
import request from 'supertest'

describe('CORS Middleware', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should set CORS headers for /test_cors route', async () => {
    const response = await request(app.server).get('/test_cors').expect(200)

    expect(response.headers['access-control-allow-origin']).toBe('*')
    expect(response.headers['access-control-allow-headers']).toBe('*')
    expect(response.headers['access-control-allow-methods']).toBe('*')
  })
})
