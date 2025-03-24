import type { AddAccountRepository } from '@/data/protocols/add-account-repository'
import type { AccountModel } from '@/domain/models/account'
import type { AddAccountModel } from '@/domain/usecases/add-account'
import { MongoHelper } from '../helpers/mongo-helper'

export class MongoAccountRepository implements AddAccountRepository {
  async add(accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = MongoHelper.getCollection('accounts')

    const result = await accountCollection.insertOne(accountData)

    const account: any = await accountCollection.findOne({
      _id: result.insertedId,
    })

    if (!account) {
      throw new Error('Falha ao criar a conta')
    }

    const { _id, ...rest } = account
    return { id: _id.toString(), ...rest }
  }
}
