import type { AddAccountRepository } from '@/data/protocols/add-account-repository'
import type { AccountModel } from '@/domain/models/account'
import type { AddAccountModel } from '@/domain/usecases/add-account'
import { MongoHelper } from '../helpers/mongo-helper'

export class MongoAccountRepository implements AddAccountRepository {
  async add(accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = MongoHelper.getCollection('accounts')

    // Inserir os dados no MongoDB
    const result = await accountCollection.insertOne(accountData)

    // Buscar o documento recém-inserido pelo _id
    const account = await accountCollection.findOne({ _id: result.insertedId })

    if (!account) throw new Error('Account not found')

    // Retornar o documento encontrado com os campos exigidos pelo AccountModel
    return {
      id: account._id.toString(),
      name: account.name,
      email: account.email,
      password: account.password,
    }
  }
}
