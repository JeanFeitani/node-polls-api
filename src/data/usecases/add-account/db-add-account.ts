import type { Encrypter } from '@/data/protocols/encrypter'
import type { AddAccountModel } from '@/domain/usecases/add-account'

export class DbAddAccount {
  constructor(private readonly encrypter: Encrypter) {}

  async add(account: AddAccountModel) {
    await this.encrypter.encrypt(account.password)
    return new Promise((resolve) => resolve(null))
  }
}
