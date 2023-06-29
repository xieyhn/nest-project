import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { Exclude } from 'class-transformer'
import { ApiHideProperty } from '@nestjs/swagger'
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
  @Exclude()
  @ApiHideProperty()
  password: string

  @JoinTable({ name: 'user_role' })
  @ManyToMany(() => RoleEntity, role => role.users)
  roles: RoleEntity[]

  @CreateDateColumn()
  createTime: Date

  @UpdateDateColumn()
  updateTime: Date
}
