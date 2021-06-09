import { mergeDeepLeft, compose } from 'ramda'

import { log } from './log'

export const HIGHLIGHT = 'HIGHLIGHT'
export const INFO = 'INFO'
export const WARN = 'WARN'
export const ERROR = 'ERROR'
export const SUCCESS = 'SUCCESS'
export const LOG = 'LOG'

const libConfig = {
  all: { format: (v) => v },
  [HIGHLIGHT]: { color: 'magenta', scope: HIGHLIGHT },
  [INFO]: { color: 'cyan', scope: INFO },
  [WARN]: { color: 'yellow', scope: WARN },
  [ERROR]: { color: 'red', scope: ERROR },
  [SUCCESS]: { color: 'green', scope: SUCCESS },
  default: { scope: LOG },
}

const getConfig = (config, type, scope) => {
  return compose(mergeDeepLeft(config[scope] || {}), mergeDeepLeft(config[type || 'default'] || {}))(config.all)
}

const formatParams = (projectConfigs, type, scope, msg, config) => {
  const defaultConfig = getConfig(projectConfigs, type, scope)
  return [msg, { ...defaultConfig, ...(config || {}), scope }]
}

export const LocalLogger = (config) => {
  config = mergeDeepLeft(config, libConfig)

  return {
    log: (...params) => log(...formatParams(config, 'default', ...params)),
    highlight: (...params) => log(...formatParams(config, HIGHLIGHT, ...params)),
    hl: (...params) => log(...formatParams(config, HIGHLIGHT, ...params)),
    info: (...params) => log(...formatParams(config, INFO, ...params)),
    success: (...params) => log(...formatParams(config, SUCCESS, ...params)),
    warn: (...params) => log(...formatParams(config, WARN, ...params)),
    error: (...params) => log(...formatParams(config, ERROR, ...params)),
  }
}
