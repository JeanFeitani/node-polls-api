import type { Encrypter } from '@/data/protocols/encrypter'
import { DbAddAccount } from './db-add-account'

const makeEncrypter = () => {
  class EncrypterStub implements Encrypter {
    async encrypt(password: string): Promise<string> {
      return new Promise((resolve) => resolve('hashed_password'))
    }
  }

  return new EncrypterStub()
}

const makeSut = () => {
  const encrypterStub = makeEncrypter()
  const sut = new DbAddAccount(encrypterStub)

  return { encrypterStub, sut }
}

describe('Db Add Account', () => {
  it('Should call Encrypter with correct password', () => {
    const { encrypterStub, sut } = makeSut()
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
