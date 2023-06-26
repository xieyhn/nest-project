export class CommonException {
  public constructor(public readonly code: number, public readonly message: string) {}

  static readonly USER_NOT_FOUND = new CommonException(1000, 'User not found')
  static readonly USER_EXIST = new CommonException(1001, 'User already exist')
  static readonly INVALID_TOKEN = new CommonException(1002, 'Invalid token')
  // 没有访问权限
  static readonly ACCESS_DENIED = new CommonException(403, 'Access denied')

  getCode() {
    return this.code
  }

  getMessage() {
    return this.message
  }
}
