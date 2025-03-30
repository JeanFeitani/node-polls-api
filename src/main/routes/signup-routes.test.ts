import request from 'supertest'
import { app } from '../config/app'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'

describe('SignUp Routes', () => {
  beforeAll(async () => {
    await app.ready()

    await MongoHelper.connect((globalThis as any).__MONGO_URI__)
  })

  afterAll(async () => {
    await app.close()

    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
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
