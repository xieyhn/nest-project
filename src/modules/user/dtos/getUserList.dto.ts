import { PageRequestDto, PageResponseDto } from 'src/dtos/page.dto'
import { ValidatePage } from 'src/decorators/ValidatePage.decorator'
import { UserEntity } from '../entities/User.entity'

export class GetUserListRequestDto {
  @ValidatePage()
  page: PageRequestDto
}

export class GetUserListResponseDto {
  users: UserEntity[]
  page: PageResponseDto
}
