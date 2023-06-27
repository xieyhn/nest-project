import { format as utilFormat } from 'node:util'
import { format, transports } from 'winston'
import { WinstonModuleOptions, WinstonModuleOptionsFactory } from 'nest-winston'
import { ConfigService } from '@nestjs/config'
import { Inject } from '@nestjs/common'
import DailyRotateFile from 'winston-daily-rotate-file'

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
          const splat = info[Symbol.for('splat')]
          return `[${info.timestamp}][${info.level}]: ${splat ? utilFormat(info.message, ...splat) : info.message}`
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
