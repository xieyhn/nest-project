import { Inject, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { CommonException } from 'src/common/exception'
import { UserEntity } from '../user/entities/User.entity'
import { UserService } from '../user/user.service'
import type { LoginBodyDto } from './dtos/LoginBody.dto'
import type { RegisterBodyDto } from './dtos/RegisterBody.dto'

@Injectable()
export class AuthService {
  @Inject(UserService)
  private userService: UserService

  @Inject(JwtService)
  private jwtService: JwtService

  async register(bodyDto: RegisterBodyDto) {
    let user = await this.userService.findOneBy({ userName: bodyDto.userName })

    if (user)
      throw CommonException.USER_EXIST

    user = new UserEntity()
    user.userName = bodyDto.userName
    user.password = bodyDto.password

    await this.userService.save(user)

    return null
  }

  async userLogin(bodyDto: LoginBodyDto) {
    const user = await this.userService.findOneBy({
      userName: bodyDto.userName,
      password: bodyDto.password,
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
