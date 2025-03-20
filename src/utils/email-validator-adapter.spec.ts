import validator from 'validator'
import { EmailValidatorAdapter } from './email-validator-adpter'

jest.mock('validator', () => ({
  isEmail(): boolean {
    return true
  },
}))

const makeSut = () => new EmailValidatorAdapter()

describe('Email validator adapter', () => {
  it('Should return false if validator return false', () => {
    const sut = makeSut()
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
    const isValid = sut.isValid('invalid_email@email.com')
    expect(isValid).toBe(false)
  })

  it('Should return true if validator return true', () => {
    const sut = makeSut()
    const isValid = sut.isValid('valid_email@email.com')
    expect(isValid).toBe(true)
  })

  it('Should email validator have been called with correct email', () => {
    const sut = makeSut()
    const isEmailSpy = jest.spyOn(validator, 'isEmail')
    sut.isValid('valid_email@email.com')
    expect(isEmailSpy).toHaveBeenCalledWith('valid_email@email.com')
  })
})
