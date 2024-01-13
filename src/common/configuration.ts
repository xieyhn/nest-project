import { resolve } from 'node:path'
import { readFileSync } from 'node:fs'
import { env } from 'node:process'
import * as yaml from 'js-yaml'

let applicationConfig: Record<string, any> | null = null

export function configuration(): Record<string, any> {
  if (!applicationConfig)
    applicationConfig = yaml.load(readFileSync(resolve(__dirname, `../../env.${env.NODE_ENV || 'development'}.yaml`), 'utf8'))

  return applicationConfig
}
