import type { Collection } from 'mongodb'
import { MongoHelper } from '../helpers/mongo-helper'
import { MongoLogRepository } from './log'

describe('MongoDb', () => {
  let errorCollection: Collection

  beforeAll(async () => {
    await MongoHelper.connect((globalThis as any).__MONGO_URI__)
  })
  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    errorCollection = await MongoHelper.getCollection('errors')
    await errorCollection.deleteMany({})
  })

  const makeSut = () => {
    const sut = new MongoLogRepository()

    return { sut }
  }

  it('Should create an error log on success', async () => {
    const { sut } = makeSut()

    await sut.logError('any_eror')

    const count = await errorCollection.countDocuments()

    expect(count).toBe(1)
  })
})
