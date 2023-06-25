import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { UserEntity } from './user.entity'
import { PermissionEntity } from './Permission.entity'

@Entity({
  name: 'role',
})
export class RoleEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 20 })
  name: string

  @ManyToMany(() => UserEntity, user => user.roles)
  users: UserEntity[]

  @JoinTable({ name: 'role_permission' })
  @ManyToMany(() => PermissionEntity, permission => permission.roles)
  permissions: PermissionEntity[]

  @CreateDateColumn()
  createTime: Date

  @UpdateDateColumn()
  updateTime: Date
}