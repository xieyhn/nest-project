import { Injectable } from '@nestjs/common'
import { EntityManager, FindOneOptions } from 'typeorm'
import { InjectEntityManager } from '@nestjs/typeorm'
import { UserEntity } from './entities/User.entity'

@Injectable()
export class UserService {
  @InjectEntityManager()
  private entityManager: EntityManager

  create(user: UserEntity) {
    return this.entityManager.save(user)
  }

  findOne(options: FindOneOptions<UserEntity>) {
    return this.entityManager.findOne(UserEntity, options)
  }

  findOneBy(condition: Partial<UserEntity>) {
    return this.entityManager.findOneBy(UserEntity, condition)
  }

  async getUserInfo(id: number) {
    return {
      user: await this.findOneBy({ id }),
    }
  }
}
