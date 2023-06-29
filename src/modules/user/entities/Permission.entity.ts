import { Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { ApiHideProperty } from '@nestjs/swagger'
import { RoleEntity } from './Role.entity'

@Entity({
  name: 'permission',
})
export class PermissionEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @ApiHideProperty()
  @ManyToMany(() => RoleEntity, role => role.permissions)
  roles: RoleEntity[]

  @CreateDateColumn()
  createTime: Date

  @UpdateDateColumn()
  updateTime: Date
}
