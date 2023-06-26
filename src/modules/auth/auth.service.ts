import { Inject, Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { JwtService } from '@nestjs/jwt'
import { CommonException } from '../../exception/common.exception'
import { UserEntity } from '../user/entities/User.entity'
import { LoginDto } from './dto/Login.dto'
import { RegisterDto } from './dto/Register.dto'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @Inject(JwtService)
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    let user = await this.userRepository.findOne({
      where: { userName: registerDto.userName },
    })

    if (user)
      throw CommonException.USER_EXIST

    user = new UserEntity()
    user.userName = registerDto.userName
    user.password = registerDto.password

    await this.userRepository.save(user)

    return null
  }

  async userLogin(loginDto: LoginDto) {
    const user = await this.userRepository.findOne({
      where: {
        userName: loginDto.userName,
        password: loginDto.password,
      },
    })

    if (!user)
      throw CommonException.USER_NOT_FOUND

    const token = await this.jwtService.signAsync({
      id: user.id,
      userName: user.userName,
    })

    return {
      token,
    }
  }
}
