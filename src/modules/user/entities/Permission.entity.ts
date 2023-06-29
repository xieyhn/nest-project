import { Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { ApiHideProperty } from '@nestjs/swagger'
import { Exclude } from 'class-transformer'
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
  @Exclude()
  @ManyToMany(() => RoleEntity, role => role.permissions)
  roles: RoleEntity[]

  @ApiHideProperty()
  @Exclude()
  @CreateDateColumn()
  createTime: Date

  @ApiHideProperty()
  @Exclude()
  @UpdateDateColumn()
  updateTime: Date
}
