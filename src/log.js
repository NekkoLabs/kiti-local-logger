import { type, toString } from 'ramda'

const colors = {
  default: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
}

const bgColors = {
  red: '\x1b[41m',
  green: '\x1b[42m',
  yellow: '\x1b[43m',
  blue: '\x1b[44m',
  magenta: '\x1b[45m',
  cyan: '\x1b[46m',
}

export const log = (msg, { hide, raw, json, format, disabled, scope, color, logType, showTime }) => {
  if (process.env.NODE_ENV !== 'development' || !!hide) return
  if (!!json) format = (v) => JSON.stringify(v, 0, 2)

  let finalMessage = ''

  if (!!showTime) {
    const time = new Date()
    const hour = time.getHours()
    const min = time.getMinutes()
    const sec = time.getSeconds()
    finalMessage += `[${hour}:${min}:${sec}] `
  }

  if (!!scope) finalMessage += `[${scope}] `

  msg = type(msg) === 'Array' ? msg.map(toString).join(' ') : msg
  if (!raw) {
    try {
      finalMessage += format(msg)
    } catch (e) {
      finalMessage += msg
    }
  }

  console[logType || 'log'](colors[color || 'default'] + '%s' + colors.default, finalMessage)
  if (raw) console[logType || 'log'](msg)
}
