/**
 * Created by yujintang on 2017/2/7.
 */

'use strict';

var log4js = function () {

    const log4js = require('log4js'),
        cfg_path = global.config.path,
        fs = require('fs'),
        path = require('path');

    // trace debug  info  warn  error  fatal //

    const log_path = cfg_path.log_path;
    

    var appenders = [
        {
            type: 'console'
        },
        {
            type: 'dateFile',
            filename: path.resolve(log_path, 'db.log'),
            pattern: '-yyyy-MM-dd',
            alwaysIncludePattern: true, // 文件名是否始终包含占位符
            category: 'db', //db操作时打印的日志
            level: 'ALL'
        },
        {
            type: 'dateFile',
            filename: path.resolve(log_path, 'action.log'),
            pattern: '-yyyy-MM-dd',
            alwaysIncludePattern: true,
            category: 'action', //用户操作记录
            level: 'ALL'
        },
        {
            type: 'dateFile',
            filename: path.resolve(log_path, 'system.log'),
            pattern: '-yyyy-MM-dd',
            alwaysIncludePattern: true,
            category: 'system', //系统问题
            level: 'ALL'
        }
    ];

    log4js.configure({
        appenders: appenders
    });

    var logger_export = {};

    appenders.forEach(function (appender) {
        let name = appender.category;
        if (name) {
            let logger = log4js.getLogger(name);
            logger_export[name] = logger;
            logger.setLevel(appender.level || 'ALL');
        }
    });

    return logger_export;
}();

global.log = log4js;
module.exports = log4js;