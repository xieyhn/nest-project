import { NestFactory } from '@nestjs/core'
import { LoggerService, ValidationPipe } from '@nestjs/common'
import { NestExpressApplication } from '@nestjs/platform-express'
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston'
import { ConfigService } from '@nestjs/config'
import { GlobalExceptionFilter } from 'src/filters/GlobalException.filter'
import { TransformInterceptor } from 'src/interceptors/Transform.interceptor'
import { setup as swaggerSetup } from 'src/swagger'
import { AppModule } from './app.module'
import { LogInterceptor } from './interceptors/Log.interceptor'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
    bufferLogs: true,
  })
  const logger = app.get<LoggerService>(WINSTON_MODULE_NEST_PROVIDER)
  const configService = app.get(ConfigService)
  const port = configService.get<number>('port')

  app.useLogger(logger)

  app.useGlobalPipes(new ValidationPipe({
    // 将入参的普通对象转为 DTO 类实例
    transform: true,
  }))
  app.useGlobalFilters(new GlobalExceptionFilter(logger))
  app.useGlobalInterceptors(new LogInterceptor(logger), new TransformInterceptor())

  // setup swagger
  swaggerSetup(app)

  await app.listen(port)

  logger.log(`Application is running on port: ${port}`)
}

bootstrap()
