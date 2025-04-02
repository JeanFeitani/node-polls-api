import { DbAddAccount } from '@/data/usecases/add-account/db-add-account'
import { BcryptAdapter } from '@/infra/criptography/bcrypt-adapter'
import { MongoAccountRepository } from '@/infra/db/mongodb/account-repository/mongo-account-repository'
import { SignUpController } from '@/presentation/controllers/signup/signup'
import { EmailValidatorAdapter } from '@/utils/email-validator-adpter'
import { LogControllerDecorator } from '../decorators/log'
import type { Controller } from '@/presentation/protocols'
import { MongoLogRepository } from '@/infra/db/mongodb/log-repository/log'

export const makeSignUpController = (): Controller => {
  const bcryptAdpter = new BcryptAdapter(12)
  const emailValidatorAdapter = new EmailValidatorAdapter()
  const addAccountRepository = new MongoAccountRepository()
  const dbAddAccount = new DbAddAccount(bcryptAdpter, addAccountRepository)
  const signUpController = new SignUpController(
    emailValidatorAdapter,
    dbAddAccount,
  )
  const mongoLogRepository = new MongoLogRepository()

  const logControllerDecorator = new LogControllerDecorator(
    signUpController,
    mongoLogRepository,
  )

  return logControllerDecorator
}
