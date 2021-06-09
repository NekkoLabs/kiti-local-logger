import _toConsumableArray from '@babel/runtime/helpers/toConsumableArray';
import _defineProperty from '@babel/runtime/helpers/defineProperty';
import { type, toString, mergeDeepLeft, compose } from 'ramda';

var colors = {
  "default": '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};
var log = function log(msg, _ref) {
  var hide = _ref.hide,
      raw = _ref.raw,
      json = _ref.json,
      format = _ref.format;
      _ref.disabled;
      var scope = _ref.scope,
      color = _ref.color,
      logType = _ref.logType,
      showTime = _ref.showTime;
  if (process.env.NODE_ENV !== 'development' || !!hide) return;
  if (!!json) format = function format(v) {
    return JSON.stringify(v, 0, 2);
  };
  var finalMessage = '';

  if (!!showTime) {
    var time = new Date();
    var hour = time.getHours();
    var min = time.getMinutes();
    var sec = time.getSeconds();
    finalMessage += "[".concat(hour, ":").concat(min, ":").concat(sec, "] ");
  }

  if (!!scope) finalMessage += "[".concat(scope, "] ");
  msg = type(msg) === 'Array' ? msg.map(toString).join(' ') : msg;

  if (!raw) {
    try {
      finalMessage += format(msg);
    } catch (e) {
      finalMessage += msg;
    }
  }

  console[logType || 'log'](colors[color || 'default'] + '%s' + colors["default"], finalMessage);
  if (raw) console[logType || 'log'](msg);
};

var _libConfig;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var HIGHLIGHT = 'HIGHLIGHT';
var INFO = 'INFO';
var WARN = 'WARN';
var ERROR = 'ERROR';
var SUCCESS = 'SUCCESS';
var LOG = 'LOG';
var libConfig = (_libConfig = {
  all: {
    format: function format(v) {
      return v;
    }
  }
}, _defineProperty(_libConfig, HIGHLIGHT, {
  color: 'magenta',
  scope: HIGHLIGHT
}), _defineProperty(_libConfig, INFO, {
  color: 'cyan',
  scope: INFO
}), _defineProperty(_libConfig, WARN, {
  color: 'yellow',
  scope: WARN
}), _defineProperty(_libConfig, ERROR, {
  color: 'red',
  scope: ERROR
}), _defineProperty(_libConfig, SUCCESS, {
  color: 'green',
  scope: SUCCESS
}), _defineProperty(_libConfig, "default", {
  scope: LOG
}), _libConfig);

var getConfig = function getConfig(config, type, scope) {
  return compose(mergeDeepLeft(config[scope] || {}), mergeDeepLeft(config[type || 'default'] || {}))(config.all);
};

var formatParams = function formatParams(projectConfigs, type, scope, msg, config) {
  var defaultConfig = getConfig(projectConfigs, type, scope);
  return [msg, _objectSpread(_objectSpread(_objectSpread({}, defaultConfig), config || {}), {}, {
    scope: scope
  })];
};

var LocalLogger = function LocalLogger(config) {
  config = mergeDeepLeft(config, libConfig);
  return {
    log: function log$1() {
      for (var _len = arguments.length, params = new Array(_len), _key = 0; _key < _len; _key++) {
        params[_key] = arguments[_key];
      }

      return log.apply(void 0, _toConsumableArray(formatParams.apply(void 0, [config, 'default'].concat(params))));
    },
    highlight: function highlight() {
      for (var _len2 = arguments.length, params = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        params[_key2] = arguments[_key2];
      }

      return log.apply(void 0, _toConsumableArray(formatParams.apply(void 0, [config, HIGHLIGHT].concat(params))));
    },
    hl: function hl() {
      for (var _len3 = arguments.length, params = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        params[_key3] = arguments[_key3];
      }

      return log.apply(void 0, _toConsumableArray(formatParams.apply(void 0, [config, HIGHLIGHT].concat(params))));
    },
    info: function info() {
      for (var _len4 = arguments.length, params = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        params[_key4] = arguments[_key4];
      }

      return log.apply(void 0, _toConsumableArray(formatParams.apply(void 0, [config, INFO].concat(params))));
    },
    success: function success() {
      for (var _len5 = arguments.length, params = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        params[_key5] = arguments[_key5];
      }

      return log.apply(void 0, _toConsumableArray(formatParams.apply(void 0, [config, SUCCESS].concat(params))));
    },
    warn: function warn() {
      for (var _len6 = arguments.length, params = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        params[_key6] = arguments[_key6];
      }

      return log.apply(void 0, _toConsumableArray(formatParams.apply(void 0, [config, WARN].concat(params))));
    },
    error: function error() {
      for (var _len7 = arguments.length, params = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
        params[_key7] = arguments[_key7];
      }

      return log.apply(void 0, _toConsumableArray(formatParams.apply(void 0, [config, ERROR].concat(params))));
    }
  };
};

export { ERROR, HIGHLIGHT, INFO, LOG, LocalLogger, SUCCESS, WARN };
