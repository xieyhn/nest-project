import { Body, Controller, Inject, Post, Req, UseGuards } from '@nestjs/common'
import { Request } from 'express'
import { AuthorizationGuard } from 'src/guards/authorization.guard'
import { ApiTags } from '@nestjs/swagger'
import { ApiCommonResponse } from 'src/decorators/apiCommonResponse.decorator'
import { UserService } from './user.service'
import { GetUserInfoResponseDto } from './dtos/getUserInfo.dto'
import { GetUserListRequestDto, GetUserListResponseDto } from './dtos/getUserList.dto'

@ApiTags('user')
@Controller('/user')
@UseGuards(AuthorizationGuard)
export class UserController {
  @Inject(UserService)
  private userService: UserService

  @Post('/getUserInfo')
  @ApiCommonResponse(GetUserInfoResponseDto)
  getUserInfo(@Req() request: Request): Promise<GetUserInfoResponseDto> {
    return this.userService.getUserInfoBy({ id: request.user!.id })
  }

  @Post('/getUserList')
  @ApiCommonResponse(GetUserListResponseDto)
  async getUserList(@Body() getUserListRequestDto: GetUserListRequestDto): Promise<GetUserListResponseDto> {
    // TODO 分页参数转换
    const [users, total] = await this.userService.findAndCount({
      skip: getUserListRequestDto.page.pageIndex,
      take: getUserListRequestDto.page.pageSize,
    })
    return {
      users,
      page: {
        pageIndex: 1,
        pageSize: 20,
        total,
      },
    }
  }
}
