import request from 'supertest'
import { app } from '../config/app'

describe('SignUp Routes', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })
  test('Should return an account on success', async () => {
    await request(app.server)
      .post('/api/signup')
      .send({
        name: 'Jean',
        email: 'jean@gmail.com',
        password: '123',
        passwordConfirmation: '123',
      })
      .expect(200)
  })
})
