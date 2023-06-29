export class PageRequestDto {
  pageIndex: number
  pageSize: number
}

export class PageResponseDto extends PageRequestDto {
  total: number
}
