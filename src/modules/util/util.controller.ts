import { extname } from 'node:path'
import { Controller, Post, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common'
import { FilesInterceptor } from '@nestjs/platform-express'
import { AuthorizationGuard } from 'src/guards/authorization.guard'
import { diskStorage } from 'multer'
import { v4 as uuidV4 } from 'uuid'
import { loadApplicationConfig } from 'src/common/application.config'
import { get } from 'lodash'
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger'
import { FilesUpdateDto } from './dto/files-upload.dto'

@Controller('util')
@ApiTags('util')
export class UtilController {
  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: '多文件上传',
    type: FilesUpdateDto,
  })
  @UseInterceptors(FilesInterceptor('files', 9, {
    storage: diskStorage({
      destination: (_, __, cb) => {
        const config = loadApplicationConfig()
        cb(null, get(config, 'upload.dest'))
      },
      filename: (_, file, cb) => {
        cb(null, `${uuidV4()}${extname(file.originalname)}`)
      },
    }),
  }))
  @UseGuards(AuthorizationGuard)
  upload(@UploadedFiles() files: Array<Express.Multer.File>) {
    return {
      files: files.map(file => file.filename),
    }
  }
}
