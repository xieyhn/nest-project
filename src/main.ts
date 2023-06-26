import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { NestExpressApplication } from '@nestjs/platform-express'
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston'
import { AppModule } from './app.module'
import { GlobalExceptionFilter } from './filters/global.exception.filter'
import { TransformInterceptor } from './interceptors/transform.interceptor'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
  })
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER))

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
  }))
  app.useGlobalFilters(new GlobalExceptionFilter())
  app.useGlobalInterceptors(new TransformInterceptor())

  await app.listen(3000)
}

bootstrap()
