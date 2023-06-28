import { extname } from 'node:path'
import { Controller, Inject, Post, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common'
import { FilesInterceptor } from '@nestjs/platform-express'
import { AuthorizationGuard } from 'src/guards/authorization.guard'
import { diskStorage } from 'multer'
import { v4 as uuidV4 } from 'uuid'
import { ConfigService } from '@nestjs/config'
import { loadApplicationConfig } from 'src/common/application.config'
import { get } from 'lodash'

@Controller('util')
export class UtilController {
  @Inject(ConfigService)
  private configService: ConfigService

  @Post('upload')
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
