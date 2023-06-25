import { Controller, Post, Req } from '@nestjs/common'
import { Request } from 'express'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('getUserInfo')
  getUserInfo(@Req() request: Request) {
    return this.userService.getUserInfo(request.user!.id)
  }
}
