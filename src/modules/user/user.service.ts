import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { UserEntity } from './entities/User.entity'

@Injectable()
export class UserService {
  @InjectRepository(UserEntity)
  private userRepository: Repository<UserEntity>

  create(user: UserEntity) {
    return this.userRepository.save(user)
  }

  findOneBy(condition: Partial<UserEntity>) {
    return this.userRepository.findOneBy(condition)
  }

  async getUserInfo(id: number) {
    return {
      user: await this.findOneBy({ id }),
    }
  }
}
