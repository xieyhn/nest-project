import { CanActivate, ExecutionContext } from '@nestjs/common'

export class AuthorizationGuard implements CanActivate {
  async canActivate(_context: ExecutionContext) {
    // const request: Request = context.switchToHttp().getRequest()
    // TODO
    return true
  }
}
