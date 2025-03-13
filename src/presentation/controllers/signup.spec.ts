import { SignUpController } from './signup'

describe('SignUp Controller', () => {
  it('Should return 400 if no name is provided', () => {
    const httpResponse = SignUpController({
      body: {
        email: 'johndoe@email.com',
        password: 'pass',
      },
    })

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new Error('Missing param: name'))
  })
})
