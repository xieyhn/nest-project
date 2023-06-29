import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, LoggerService } from '@nestjs/common'
import { Response } from 'express'
import { CommonException } from 'src/common/exception'
import { castArray } from 'lodash'

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(
    private readonly logger: LoggerService,
  ) {}

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()

    let HttpStatusCode: number = HttpStatus.INTERNAL_SERVER_ERROR
    let statusCode: number = HttpStatus.INTERNAL_SERVER_ERROR
    let message = 'Unexpected error'

    try {
      if (exception instanceof HttpException) {
        HttpStatusCode = HttpStatus.OK
        statusCode = exception.getStatus()

        // parameter error
        if (statusCode === HttpStatus.BAD_REQUEST) {
          message = castArray((exception.getResponse() as any).message).join(',')
        }
        else if (statusCode === HttpStatus.NOT_FOUND) {
          HttpStatusCode = HttpStatus.NOT_FOUND
          statusCode = HttpStatus.NOT_FOUND
          message = exception.message
        }
      }
      else if (exception instanceof CommonException) {
        HttpStatusCode = 200
        statusCode = exception.getCode()
        message = exception.getMessage()
      }
      else {
        throw exception
      }
    }
    catch (err) {
      if (err instanceof Error)
        this.logger.error(exception.stack)
      else
        this.logger.error(err)
    }

    response
      .status(HttpStatusCode)
      .json({
        statusCode,
        message,
      })
  }
}
