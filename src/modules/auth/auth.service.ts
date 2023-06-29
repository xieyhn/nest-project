import { Inject, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { CommonException } from 'src/common/exception'
import { UserEntity } from '../user/entities/User.entity'
import { UserService } from '../user/user.service'
import { LoginRequestDto } from './dtos/login.dto'
import { RegisterRequestDto } from './dtos/register.dto'

@Injectable()
export class AuthService {
  @Inject(UserService)
  private userService: UserService

  @Inject(JwtService)
  private jwtService: JwtService

  async register(registerRequestDto: RegisterRequestDto) {
    let user = await this.userService.findOneBy({ userName: registerRequestDto.userName })

    if (user)
      throw CommonException.USER_EXIST

    user = new UserEntity()
    user.userName = registerRequestDto.userName
    user.password = registerRequestDto.password

    await this.userService.save(user)

    return null
  }

  async userLogin(loginRequestDto: LoginRequestDto) {
    const user = await this.userService.findOneBy({
      userName: loginRequestDto.userName,
      password: loginRequestDto.password,
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
