import { SetMetadata } from '@nestjs/common'

export const ROLES_KEY = 'roles'
export const PERMISSIONS_KEY = 'permissions'

export function Roles(...roles: string[]) {
  return SetMetadata(ROLES_KEY, roles)
}

export function Permissions(...permissions: string[]) {
  return SetMetadata(PERMISSIONS_KEY, permissions)
}
