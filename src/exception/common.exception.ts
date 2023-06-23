export class CommonException {
  public constructor(public readonly code: number, public readonly message: string) {}

  static readonly USER_NOT_FOUND = new CommonException(1000, 'User not found')

  getCode() {
    return this.code
  }

  getMessage() {
    return this.message
  }
}
