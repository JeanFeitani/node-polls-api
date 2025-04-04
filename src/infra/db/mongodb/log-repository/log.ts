import type { LogErrorRepository } from '@/data/protocols/log-error-repository'
import { MongoHelper } from '../helpers/mongo-helper'

export class MongoLogRepository implements LogErrorRepository {
  async logError(stack: string): Promise<void> {
    const errorCollection = await MongoHelper.getCollection('errors')
    errorCollection.insertOne({
      stack,
      date: new Date(),
    })
  }
}
