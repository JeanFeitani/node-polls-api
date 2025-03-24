import { MongoHelper } from '../helpers/mongo-helper'
import { MongoAccountRepository } from './mongo-account-repository'

describe('MongoDb', () => {
  beforeAll(async () => {
    await MongoHelper.connect((globalThis as any).__MONGO_URI__)
  })
  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  it('Should return account on success', async () => {
    const sut = new MongoAccountRepository()

    const account = await sut.add({
      name: 'any_name',
      email: 'any_email@email.com',
      password: 'any_password',
    })

    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toBe('any_name')
    expect(account.email).toBe('any_email@email.com')
    expect(account.password).toBe('any_password')
  })
})
