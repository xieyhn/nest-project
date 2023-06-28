import { resolve } from 'node:path'
import { readFileSync } from 'node:fs'
import * as yaml from 'js-yaml'

let applicationConfig: Record<string, any> | null = null

export function loadApplicationConfig(): Record<string, any> {
  if (!applicationConfig)
    applicationConfig = yaml.load(readFileSync(resolve(__dirname, `../../env.${process.env.NODE_ENV || 'development'}.yaml`), 'utf8'))

  return applicationConfig
}
