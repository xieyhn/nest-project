import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { ApiHideProperty } from '@nestjs/swagger'
import { Exclude } from 'class-transformer'
import { RoleEntity } from './Role.entity'

@Entity({
  name: 'user',
})
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true, length: 50 })
  userName: string

  @Column({ length: 50 })
  @ApiHideProperty()
  @Exclude()
  password: string

  @JoinTable({ name: 'user_role' })
  @ManyToMany(() => RoleEntity, role => role.users)
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
