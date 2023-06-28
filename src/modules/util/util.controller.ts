import { extname } from 'node:path'
import { Controller, Post, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common'
import { FilesInterceptor } from '@nestjs/platform-express'
import { AuthorizationGuard } from 'src/guards/authorization.guard'
import { diskStorage } from 'multer'
import { v4 as uuidV4 } from 'uuid'

@Controller('util')
export class UtilController {
  @Post('upload')
  @UseInterceptors(FilesInterceptor('files', 9, {
    storage: diskStorage({
      destination: 'static/uploads',
      filename: (req, file, cb) => {
        const ext = extname(file.originalname)
        cb(null, `${uuidV4()}${ext}`)
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
