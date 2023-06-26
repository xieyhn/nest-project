import { resolve } from 'node:path'
import { readFileSync } from 'node:fs'
import * as yaml from 'js-yaml'

export function loadApplicationConfig(): Record<string, any> {
  const NODE_ENV = process.env.NODE_ENV || 'development'

  return yaml.load(readFileSync(resolve(__dirname, `../../env.${NODE_ENV}.yaml`), 'utf8'))
}
