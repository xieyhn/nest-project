import { CanActivate, ExecutionContext, Inject, LoggerService } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Request } from 'express'
import { CommonException } from 'src/common/exception'
import { JwtService } from '@nestjs/jwt'
import { Cache } from 'cache-manager'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { UserService } from 'src/modules/user/user.service'
import { UserEntity } from 'src/modules/user/entities/User.entity'
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston'
import { ROLES_KEY } from 'src/decorators/Roles.decorator'
import { PERMISSIONS_KEY } from 'src/decorators/Permissions.decorator'

export class AuthorizationGuard implements CanActivate {
  @Inject(JwtService)
  private jwtService: JwtService

  @Inject(Reflector)
  private reflector: Reflector

  @Inject(UserService)
  private userService: UserService

  @Inject(CACHE_MANAGER)
  private cacheManager: Cache

  @Inject(WINSTON_MODULE_NEST_PROVIDER)
  private logger: LoggerService

  async canActivate(context: ExecutionContext) {
    const start = Date.now()
    const request: Request = context.switchToHttp().getRequest()
    const token = request.header('token') ?? null

    const log = (message: string) => this.logger.log(
      `[authorization](${request.requestID}) ${message}`,
    )

    log(`${request.method} ${request.url} token:${token}`)

    if (!token)
      throw CommonException.INVALID_TOKEN

    try {
      const result = await this.jwtService.verifyAsync(token)
      request.user = result
      log(`user:${JSON.stringify(result)}`)
    }
    catch {
      log('invalid token')
      throw CommonException.INVALID_TOKEN
    }

    let user = await this.cacheManager.get<UserEntity>(`user:${request.user.id}`)

    if (!user) {
      log('cache miss')
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

      if (!user) {
        log('missing user')
        throw CommonException.INVALID_TOKEN
      }

      await this.cacheManager.set(`user:${request.user.id}`, user, 10 * 60 * 1000)
    }

    const requiredRoleNames = this.reflector.get<string[]>(ROLES_KEY, context.getHandler())
    const requiredPermissionNames = this.reflector.get<string[]>(PERMISSIONS_KEY, context.getHandler())
    const userRoleNames = user.roles.map(role => role.name)

    if (requiredRoleNames && requiredRoleNames.some(roleName => !userRoleNames.includes(roleName))) {
      log(`required roles: ${requiredRoleNames.join(', ')}, user roles: ${userRoleNames.join(', ')}`)
      throw CommonException.ACCESS_DENIED
    }

    if (requiredPermissionNames) {
      const userPermissionNames = user.roles.map(role => role.permissions).flat().map(p => p.name)
      if (requiredPermissionNames.some(permissionName => !userPermissionNames.includes(permissionName))) {
        log(`required permissions: ${requiredPermissionNames.join(', ')}, user permissions: ${userPermissionNames.join(', ')}`)
        throw CommonException.ACCESS_DENIED
      }
    }

    log(`success ${Date.now() - start}ms`)

    return true
  }
}
