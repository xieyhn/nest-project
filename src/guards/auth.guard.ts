import { CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Request } from 'express'
import { CommonException } from '../exception/common.exception'

@Injectable()
export class AuthGuard implements CanActivate {
  @Inject(JwtService)
  private jwtService: JwtService

  async canActivate(context: ExecutionContext) {
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
