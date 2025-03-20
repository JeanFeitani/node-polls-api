import validator from 'validator'
import { EmailValidatorAdapter } from './email-validator-adpter'

jest.mock('validator', () => ({
  isEmail(): boolean {
    return true
  },
}))

describe('Email validator adapter', () => {
  it('Should return false if validator return false', () => {
    const sut = new EmailValidatorAdapter()
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
    const isValid = sut.isValid('invalid_email@email.com')
    expect(isValid).toBe(false)
  })

  it('Should return true if validator return true', () => {
    const sut = new EmailValidatorAdapter()
    const isValid = sut.isValid('valid_email@email.com')
    expect(isValid).toBe(true)
  })
})
