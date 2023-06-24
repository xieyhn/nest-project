export class CommonException {
  public constructor(public readonly code: number, public readonly message: string) {}

  static readonly USER_NOT_FOUND = new CommonException(1000, 'User not found')
  static readonly USER_EXIST = new CommonException(1001, 'User already exist')
  static readonly INVALID_TOKEN = new CommonException(1002, 'Invalid token')

  getCode() {
    return this.code
  }

  getMessage() {
    return this.message
  }
}
