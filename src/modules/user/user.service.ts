import { Injectable } from '@nestjs/common'
import { TypeormCRUDService } from 'src/services/TypeormCRUD.service'
import { FindOptionsWhere, Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { UserEntity } from './entities/User.entity'

@Injectable()
export class UserService extends TypeormCRUDService<UserEntity> {
  @InjectRepository(UserEntity) repository: Repository<UserEntity>

  getUserInfoBy(where: FindOptionsWhere<UserEntity>) {
    return this.repository.findOne({
      where,
      relations: {
        roles: {
          permissions: true,
        },
      },
    })
  }
}
