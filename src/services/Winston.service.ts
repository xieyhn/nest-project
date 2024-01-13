import { format, transports } from 'winston'
import type { WinstonModuleOptions, WinstonModuleOptionsFactory } from 'nest-winston'
import { ConfigService } from '@nestjs/config'
import { Inject, Injectable } from '@nestjs/common'
import DailyRotateFile from 'winston-daily-rotate-file'

@Injectable()
export class WinstonConfigService implements WinstonModuleOptionsFactory {
  @Inject(ConfigService)
  private configService: ConfigService

  createWinstonModuleOptions(): WinstonModuleOptions {
    const isDev = this.configService.get('env') === 'development'
    const filename = this.configService.get('winton.filename')
    const datePattern = this.configService.get('winton.datePattern')
    const maxSize = this.configService.get('winton.maxSize')
    const maxFiles = this.configService.get('winton.maxFiles')

    return {
      format: format.combine(
        format.colorize(),
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
        format.printf((info) => {
          return `[${info.timestamp}][${info.level}]: ${info.message}`
        }),
      ),
      transports: [
        isDev
          ? new transports.Console()
          : new DailyRotateFile({
            filename,
            datePattern,
            maxSize,
            maxFiles,
          }),
      ],
    }
  }
}
