import { Controller, Post, Req, UseGuards } from '@nestjs/common'
import { Request } from 'express'
import { AuthGuard } from '../../guards/auth.guard'
import { UserService } from './user.service'

@Controller('user')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('getUserInfo')
  getUserInfo(@Req() request: Request) {
    return this.userService.getUserInfo(request.user!.id)
  }
}
