/**
 * 打日志的，直接用
 * XoW.logger.log("aaa"); // 输出 [log]aaa
 * XoW.logger.logStart("aaa") // 输出 [log]aaa 开始
 * XoW.logger.logEnd("aaa") // 输出 [log]aaa 结束
 * XoW.logger.logParams({k1 : "v1", k2 : "v2"}); 输出 [log][参数][k1 : v1][k2 : v2]
 */
const logger = {
  // 'use strict'
  LOG_LEVEL: {
    DEBUG: 0,
    INFO: 1,
    WARN: 2,
    ERROR: 3,
    FATAL: 4
  },
  levels: ['debug', 'info', 'warn', 'error', 'fatal'],
  colors: ['black', 'blue', 'orange', 'red', 'yellow'],
  version: 2.0,
  options: {
    logLevel: 0, // represents debug level to output
    isTimestamp: true,
    isLevel: true,
    isColor: true
  },
  _logTemplate: function (pContent, pLevel) {
    var format = this.options.isColor ? '%c' : ''
    if (this.options.isTimestamp) {
      var timestamp = new Date().getTime()
      format += '[' + timestamp + ']'
    }
    if (this.options.isLevel) {
      format += '[' + this.levels[pLevel].toUpperCase() + ']'
    }
    let color = this.colors[pLevel]
    console.log(format + pContent, `color:${color};`)
  },
  l: function (pLevel, pContent) {
    if (pLevel < 0 || this.LOG_LEVEL.length - 1 < pLevel) {
      console.log('Invalid log level.')
      return
    }
    if (pLevel >= this.options.logLevel) {
      this._logTemplate(pContent, pLevel)
    }
  },
  d: function (pContent) {
    this.l(this.LOG_LEVEL.DEBUG, pContent)
  },
  i: function (pContent) {
    this.l(this.LOG_LEVEL.INFO, pContent)
  },
  w: function (pContent) {
    this.l(this.LOG_LEVEL.WARN, pContent)
  },
  e: function (pContent) {
    this.l(this.LOG_LEVEL.ERROR, pContent)
  },
  f: function (pContent) {
    this.l(this.LOG_LEVEL.FATAL, pContent)
  },
  // method begin
  ms: function (className, content) {
    // ES6模板
    var strTemplate = `[${className}]${content}[Enter]`
    this.d(strTemplate)
  },
  // method end
  me: function (className, content) {
    var strTemplate = `[${className}]${content}[Exit]`
    this.d(strTemplate)
  },
  /**
   * 用于要显示参数
   * 以logParams({key1 : "value1", key2 : "value2"})调用，
   * 会输出  [key1 : value1][ key2 value2]。
   * @param params 需要打印出来的参数
   */
  p: function (params) {
    var content = '[参数]'
    for (var key in params) {
      content = content + ' [ ' + key + ' : ' + params[key] + ' ]'
    }
    this.d(content)
  }

}

export default logger
