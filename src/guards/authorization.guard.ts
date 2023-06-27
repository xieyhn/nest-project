import { CanActivate, ExecutionContext, Inject } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Request } from 'express'
import { CommonException } from 'src/common/common.exception'
import { JwtService } from '@nestjs/jwt'
import { PERMISSIONS_KEY, ROLES_KEY } from 'src/decorators/authorization.decorator'
import { Cache } from 'cache-manager'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { UserService } from 'src/modules/user/user.service'
import { UserEntity } from 'src/modules/user/entities/User.entity'

export class AuthorizationGuard implements CanActivate {
  @Inject(JwtService)
  private jwtService: JwtService

  @Inject(Reflector)
  private reflector: Reflector

  @Inject(UserService)
  private userService: UserService

  @Inject(CACHE_MANAGER)
  private cacheManager: Cache

  async canActivate(context: ExecutionContext) {
    const request: Request = context.switchToHttp().getRequest()
    const token = request.header('token') ?? null

    if (!token)
      throw CommonException.INVALID_TOKEN

    try {
      const result = await this.jwtService.verifyAsync(token)
      request.user = result
    }
    catch {
      throw CommonException.INVALID_TOKEN
    }

    let user = await this.cacheManager.get<UserEntity>(`user:${request.user.id}`)

    if (!user) {
      user = await this.userService.findOne({
        where: {
          id: request.user.id,
        },
        relations: {
          roles: {
            permissions: true,
          },
        },
      })
      if (!user)
        throw CommonException.INVALID_TOKEN

      await this.cacheManager.set(`user:${request.user.id}`, user)
    }

    const requiredRoleNames = this.reflector.get<string[]>(ROLES_KEY, context.getHandler())
    const requiredPermissionNames = this.reflector.get<string[]>(PERMISSIONS_KEY, context.getHandler())
    const userRoleNames = user.roles.map(role => role.name)

    if (requiredRoleNames && requiredRoleNames.some(roleName => !userRoleNames.includes(roleName)))
      throw CommonException.ACCESS_DENIED

    if (requiredPermissionNames) {
      const userPermissionNames = user.roles.map(role => role.permissions).flat().map(p => p.name)
      if (requiredPermissionNames.some(permissionName => !userPermissionNames.includes(permissionName)))
        throw CommonException.ACCESS_DENIED
    }

    return true
  }
}
