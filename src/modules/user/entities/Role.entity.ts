import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { ApiHideProperty } from '@nestjs/swagger'
import { Exclude } from 'class-transformer'
import { UserEntity } from './User.entity'
import { PermissionEntity } from './Permission.entity'

@Entity({
  name: 'role',
})
export class RoleEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 20 })
  name: string

  @ApiHideProperty()
  @Exclude()
  @ManyToMany(() => UserEntity, user => user.roles)
  users: UserEntity[]

  @JoinTable({ name: 'role_permission' })
  @ManyToMany(() => PermissionEntity, permission => permission.roles)
  permissions: PermissionEntity[]

  @ApiHideProperty()
  @Exclude()
  @CreateDateColumn()
  createTime: Date

  @ApiHideProperty()
  @Exclude()
  @UpdateDateColumn()
  updateTime: Date
}
