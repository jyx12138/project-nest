"use strict";
// config/log4js.ts
// https://juejin.cn/post/6844903442054381582
exports.__esModule = true;
var path = require("path");
var baseLogPath = path.resolve(__dirname, '../../logs'); // 日志要写入哪个目录
var log4jsConfig = {
    appenders: {
        console: {
            type: 'console'
        },
        access: {
            type: 'dateFile',
            filename: baseLogPath + "/access/access.log",
            alwaysIncludePattern: true,
            pattern: 'yyyyMMdd',
            daysToKeep: 2,
            numBackups: 3,
            category: 'http',
            keepFileExt: true
        },
        app: {
            type: 'dateFile',
            filename: baseLogPath + "/app-out/app.log",
            alwaysIncludePattern: true,
            layout: {
                type: 'pattern',
                pattern: '{"date":"%d","level":"%p","category":"%c","host":"%h","pid":"%z","data":\'%m\'}'
            },
            // 日志文件按日期（天）切割
            pattern: 'yyyyMMdd',
            daysToKeep: 60,
            // maxLogSize: 10485760,
            numBackups: 3,
            keepFileExt: true
        },
        errorFile: {
            type: 'dateFile',
            filename: baseLogPath + "/errors/error.log",
            alwaysIncludePattern: true,
            layout: {
                type: 'pattern',
                pattern: '{"date":"%d","level":"%p","category":"%c","host":"%h","pid":"%z","data":\'%m\'}'
            },
            // 日志文件按日期（天）切割
            pattern: 'yyyyMMdd',
            daysToKeep: 60,
            // maxLogSize: 10485760,
            numBackups: 3,
            keepFileExt: true
        },
        errors: {
            type: 'logLevelFilter',
            level: 'ERROR',
            appender: 'errorFile'
        }
    },
    categories: {
        "default": {
            appenders: ['console', 'app', 'errors'],
            level: 'DEBUG'
        },
        info: { appenders: ['console', 'app', 'errors'], level: 'info' },
        access: { appenders: ['console', 'app', 'errors'], level: 'info' },
        http: { appenders: ['access'], level: 'DEBUG' }
    },
    pm2: true,
    pm2InstanceVar: 'INSTANCE_ID'
};
exports["default"] = log4jsConfig;
