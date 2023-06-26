import { Controller, Post, Req, UseGuards } from '@nestjs/common'
import { Request } from 'express'
import { AuthorizationGuard } from 'src/guards/authorization.guard'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('getUserInfo')
  @UseGuards(AuthorizationGuard)
  getUserInfo(@Req() request: Request) {
    return this.userService.getUserInfo(request.user!.id)
  }
}
