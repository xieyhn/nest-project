import { Injectable } from '@nestjs/common'
import { User } from 'src/user/entities/user.entity'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { CommonException } from 'src/exception/common.exception'
import { LoginDto } from './dto/Login.dto'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async userLogin(loginDto: LoginDto) {
    const user = await this.userRepository.findOne({
      where: {
        userName: loginDto.username,
        password: loginDto.password,
      },
    })
    if (!user)
      throw CommonException.USER_NOT_FOUND

    return null
  }
}
