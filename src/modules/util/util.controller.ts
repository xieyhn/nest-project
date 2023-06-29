import { extname } from 'node:path'
import { Controller, Post, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common'
import { FilesInterceptor } from '@nestjs/platform-express'
import { AuthorizationGuard } from 'src/guards/authorization.guard'
import { diskStorage } from 'multer'
import { v4 as uuidV4 } from 'uuid'
import { configuration } from 'src/common/configuration'
import { get } from 'lodash'
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger'
import { ApiCommonResponse } from 'src/decorators/apiCommonResponse.decorator'
import { FilesUpdateRequestDto, FilesUpdateResponseDto } from './dtos/filesUpload.dto'

@Controller('util')
@ApiTags('util')
export class UtilController {
  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: '多文件上传',
    type: FilesUpdateRequestDto,
  })
  @ApiCommonResponse(FilesUpdateResponseDto)
  @UseInterceptors(FilesInterceptor('files', 9, {
    storage: diskStorage({
      destination: (_, __, cb) => {
        const config = configuration()
        cb(null, get(config, 'upload.dest'))
      },
      filename: (_, file, cb) => {
        cb(null, `${uuidV4()}${extname(file.originalname)}`)
      },
    }),
  }))
  @UseGuards(AuthorizationGuard)
  upload(@UploadedFiles() files: Array<Express.Multer.File>): FilesUpdateResponseDto {
    return {
      files: files.map(file => file.filename),
    }
  }
}
