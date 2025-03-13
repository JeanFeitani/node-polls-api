export function SignUpController(httpRequest: any) {
  return {
    statusCode: 400,
    body: new Error('Missing param: name'),
  }
}
