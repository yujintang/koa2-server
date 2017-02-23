'use strict';

const configure = function () {

    const path = require('path');
    const fs = require('fs');

    var port,
        PROJECT_NAME = 'quehui',
        mongoHost, mongoPort, mongoDb, mongoName, mongoPassword,
        redisHost, redisPort, redisDb, redisPassword;

    switch (process.env.NODE_ENV) {
        case 'dev':
            port = 12312;
            break;
        case 'real':
            port = 3000;
            redisHost = '127.0.0.1';
            redisPort = '6379';
            redisPassword = 'redis';
            redisDb = 0;
            mongoHost = '127.0.0.1';
            mongoPort = '27017';
            mongoName = 'quehui';
            mongoPassword = 'mongo';
            mongoDb = '7diary';

            break;
        default:
            port = 12121;
            redisHost = '120.27.115.24';
            redisPort = '6379';
            redisPassword = 'redis';
            redisDb = 0;
            mongoHost = '120.27.115.24';
            mongoPort = '27017';
            mongoName = 'quehui';
            mongoPassword = 'mongo';
            mongoDb = '7diary';
            break;
    }

    var config = {

        system: {
            port: process.env.PORT || port,
            cookieKey: 'koa project',
            PROJECT_NAME: PROJECT_NAME
        },
        redis: {
            host: redisHost,
            port: redisPort,
            db: redisDb,
            pass: redisPassword
        },
        mongo: {
            host: mongoHost,
            port: mongoPort,
            db: mongoDb,
            user: mongoName,
            pass: mongoPassword
        },
        path: {
            log_path: path.resolve(process.cwd(), 'logs'),
            upload: path.resolve(process.cwd(), 'upload'),
        },
        qiniu: {
            AK: 'FHrANcgNs9aPtgFlAlbTO3IX1A8s0XH8mLr2z9Kj',
            SK: '_y8gu3WR8J9qs63x8eKgSJyQteJp1xy_bG3YOmSd',
            bucket: PROJECT_NAME,
            domain_url: 'http://olcxfktrd.bkt.clouddn.com/',
            avatar_style: 'imageView2/1/w/200/h/200/interlace/0/q/100'
        },
        mail: {
            notice: {
                host: 'smtp.mxhichina.com',
                port: 465,
                secureConnection: true, // 使用 SSL
                auth: {
                    user: 'vip@7diary.com',
                    pass: 'qH1234567'
                }
            },
            supportMail: '546609642@qq.com'
        }
    };

    //目录不存在，则创建
    let keys = Object.keys(config.path);
    keys.forEach(key => {
        let temp_path = config.path[key];
        fs.existsSync(temp_path) || fs.mkdirSync(temp_path)
    })

    return config;

}();

module.exports = configure;
global.config = configure;