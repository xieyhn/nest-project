import { Inject, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { CommonException } from 'src/exceptions/common.exception'
import { UserEntity } from '../user/entities/User.entity'
import { UserService } from '../user/user.service'
import { LoginDto } from './dto/Login.dto'
import { RegisterDto } from './dto/Register.dto'

@Injectable()
export class AuthService {
  @Inject(UserService)
  private userService: UserService

  @Inject(JwtService)
  private jwtService: JwtService

  async register(registerDto: RegisterDto) {
    let user = await this.userService.findOneBy({ userName: registerDto.userName })

    if (user)
      throw CommonException.USER_EXIST

    user = new UserEntity()
    user.userName = registerDto.userName
    user.password = registerDto.password

    await this.userService.create(user)

    return null
  }

  async userLogin(loginDto: LoginDto) {
    const user = await this.userService.findOneBy({
      userName: loginDto.userName,
      password: loginDto.password,
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
