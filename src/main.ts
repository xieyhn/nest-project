import { NestFactory } from '@nestjs/core'
import { LoggerService, ValidationPipe } from '@nestjs/common'
import { NestExpressApplication } from '@nestjs/platform-express'
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston'
import { ConfigService } from '@nestjs/config'
import { AppModule } from './app.module'
import { GlobalExceptionFilter } from './filters/global.exception.filter'
import { TransformInterceptor } from './interceptors/transform.interceptor'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
  })
  const logger = app.get<LoggerService>(WINSTON_MODULE_NEST_PROVIDER)
  const configService = app.get(ConfigService)
  const port = configService.get<number>('port')

  app.useLogger(logger)

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
  }))
  app.useGlobalFilters(new GlobalExceptionFilter())
  app.useGlobalInterceptors(new TransformInterceptor())

  await app.listen(port)

  logger.log(`Application is running on port: ${port}`)
}

bootstrap()
