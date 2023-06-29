import { NestExpressApplication } from '@nestjs/platform-express'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ResponseDto } from './dtos/Response.dto'

export function setup(app: NestExpressApplication) {
  const config = new DocumentBuilder()
    .setTitle('App')
    .setDescription('API description')
    .setVersion('1.0')
    .build()
  const document = SwaggerModule.createDocument(app, config, {
    extraModels: [ResponseDto],
  })

  SwaggerModule.setup('/swagger', app, document)
}
