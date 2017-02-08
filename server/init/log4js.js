/**
 * Created by yujintang on 2017/2/7.
 */

'use strict';

module.exports = function () {
    var log4js = require('log4js'),
        config = require('../config'),
        fs = require('fs'),
        path = require('path');

    // trace debug  info  warn  error  fatal //

    const log_path = path.resolve(process.cwd(), config.path.log_path);

    fs.existsSync(log_path) || fs.mkdirSync(log_path); //验证是否存在该目录

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
            level: 'ERROR'
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
            category: 'system', //用户操作记录
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

    global.log = logger_export;
    return logger_export;
}();