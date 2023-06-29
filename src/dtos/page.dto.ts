import { IsNumber } from 'class-validator'

export class PageRequestDto {
  @IsNumber()
  pageIndex: number

  @IsNumber()
  pageSize: number
}

export class PageResponseDto {
  pageIndex: number
  pageSize: number
  total: number
}
