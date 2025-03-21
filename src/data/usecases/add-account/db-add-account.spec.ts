import { DbAddAccount } from './db-add-account'
import type {
  AccountModel,
  AddAccountModel,
  Encrypter,
} from './db-add-account-protocols'

const makeEncrypter = () => {
  class EncrypterStub implements Encrypter {
    async encrypt(password: string): Promise<string> {
      return new Promise((resolve) => resolve('hashed_password'))
    }
  }

  return new EncrypterStub()
}
const makeAddAccountRepository = () => {
  class AddAccountRepository implements AddAccountRepository {
    async add(account: AddAccountModel): Promise<AccountModel> {
      const fakeAccount = {
        id: 'valid_id',
        name: 'valid_name',
        email: 'valid_email',
        password: 'hashed_password',
      }

      return new Promise((resolve) => resolve(fakeAccount))
    }
  }

  return new AddAccountRepository()
}

const makeSut = () => {
  const encrypterStub = makeEncrypter()
  const addAccountRepositoryStub = makeAddAccountRepository()
  const sut = new DbAddAccount(encrypterStub, addAccountRepositoryStub)

  return { encrypterStub, sut, addAccountRepositoryStub }
}

describe('Db Add Account', () => {
  it('Should call Encrypter with correct password', async () => {
    const { encrypterStub, sut } = makeSut()
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')

    const accoundData = {
      id: 'valid_id',
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password',
    }

    await sut.add(accoundData)

    expect(encryptSpy).toHaveBeenCalledWith('valid_password')
  })

  it('Should throw if Encrypter throws', async () => {
    const { encrypterStub, sut } = makeSut()
    jest
      .spyOn(encrypterStub, 'encrypt')
      .mockReturnValueOnce(new Promise((_, reject) => reject(new Error())))

    const accoundData = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password',
    }

    const promise = sut.add(accoundData)

    await expect(promise).rejects.toThrow()
  })

  it('Should call AddAccountResitory with correct values', async () => {
    const { addAccountRepositoryStub, sut } = makeSut()
    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add')

    const accoundData = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password',
    }

    await sut.add(accoundData)

    expect(addSpy).toHaveBeenCalledWith({
      name: 'valid_name',
      email: 'valid_email',
      password: 'hashed_password',
    })
  })

  it('Should throw if AddAccountResitory throws', async () => {
    const { addAccountRepositoryStub, sut } = makeSut()
    jest
      .spyOn(addAccountRepositoryStub, 'add')
      .mockReturnValueOnce(new Promise((_, reject) => reject(new Error())))

    const accoundData = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password',
    }

    const promise = sut.add(accoundData)

    await expect(promise).rejects.toThrow()
  })

  it('Should return an account on succes', async () => {
    const { sut } = makeSut()

    const accoundData = {
      id: 'valid_id',
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password',
    }

    const account = await sut.add(accoundData)

    expect(account).toEqual({
      id: 'valid_id',
      name: 'valid_name',
      email: 'valid_email',
      password: 'hashed_password',
    })
  })
})
