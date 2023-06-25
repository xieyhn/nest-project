import { CanActivate, ExecutionContext } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Request } from 'express'
import { Reflector } from '@nestjs/core'
import { CommonException } from '../exception/common.exception'

export class AuthenticationGuard implements CanActivate {
  private jwtService = new JwtService()

  private reflector = new Reflector()

  async canActivate(context: ExecutionContext) {
    const OptionalAuthentication = this.reflector.get<boolean>('OptionalAuthentication', context.getHandler())

    if (OptionalAuthentication)
      return true

    const request: Request = context.switchToHttp().getRequest()
    const authorization = request.header('authorization') ?? null

    if (!authorization)
      throw CommonException.INVALID_TOKEN

    try {
      const result = await this.jwtService.verifyAsync(authorization)
      request.user = result
      return true
    }
    catch {
      throw CommonException.INVALID_TOKEN
    }
  }
}
