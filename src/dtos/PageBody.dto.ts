import { IsNumber } from 'class-validator'

export class PageBodyDto {
  @IsNumber()
  pageIndex: number

  @IsNumber()
  pageSize: number
}
