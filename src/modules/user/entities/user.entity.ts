import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { Exclude } from 'class-transformer'

@Entity({
  name: 'user',
})
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    unique: true,
    comment: '用户账号',
  })
  userName: string

  @Column({
    comment: '用户密码',
  })
  @Exclude()
  password: string
}
