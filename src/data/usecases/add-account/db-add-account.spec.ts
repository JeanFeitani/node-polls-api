import type { Encrypter } from '@/data/protocols/encrypter'
import { DbAddAccount } from './db-add-account'

describe('Db Add Account', () => {
  it('Should call Encrypter with correct password', () => {
    class EncrypterStub implements Encrypter {
      async encrypt(password: string): Promise<string> {
        return new Promise((resolve) => resolve('hashed_password'))
      }
    }

    const encrypterStub = new EncrypterStub()
    const sut = new DbAddAccount(encrypterStub)
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')

    const accoundData = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password',
    }

    sut.add(accoundData)

    expect(encryptSpy).toHaveBeenCalledWith('valid_password')
  })
})
