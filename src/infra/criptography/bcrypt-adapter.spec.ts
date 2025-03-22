import { BcryptAdapter } from './bcrypt-adapter'
import bcrypt from 'bcrypt'

jest.mock('bcrypt', () => {
  return {
    async hash(): Promise<string> {
      return 'hash'
    },
  }
})
const salt = 12
const makeSut = () => {
  const sut = new BcryptAdapter(salt)

  return { sut }
}
describe('Bcrypt Adapter', () => {
  it('Should call Bcrypt Adpter with correct values', async () => {
    const { sut } = makeSut()

    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
  })

  it('Should return a hash on succes', async () => {
    const { sut } = makeSut()

    const hash = await sut.encrypt('any_value')
    expect(hash).toBe('hash')
  })
  it('Should throw if bcrypt throws', async () => {
    const { sut } = makeSut()

    jest.spyOn(bcrypt, 'hash').mockImplementationOnce(async () => {
      throw new Error()
    })

    const promise = sut.encrypt('any_value')
    expect(promise).rejects.toThrow()
  })
})
