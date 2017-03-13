'use strict';

const configure = function () {

    const path = require('path');
    const fs = require('fs');

    var port,
        PROJECT_NAME = '**',
        mongo, redis, github, qq;

    switch (process.env.NODE_ENV) {
        case 'dev':
            port = 12312;
            break;
        case 'real':
            port = 3000;
            break;
        default:
            port = 12121;
            mongo = {
                host: '**',
                port: '**',
                db: '**',
                user: '**',
                pass: '**'
            };
            redis = {
                host: '**',
                port: '**',
                db: 0,
                pass: '**'
            };
            github = {
                client_id: '**',
                client_secret: '**',
                redirect_url: '**',
                home_url: '**'
            };
            qq = {
                app_id: '**',
                app_key: '**',
                redirect_url: '**'
            };
            break;
    }

    var config = {

        system: {
            port: process.env.PORT || port,
            cookieKey: 'koa project',
            PROJECT_NAME: PROJECT_NAME
        },
        redis: redis,
        mongo: mongo,
        path: {
            log_path: path.resolve(process.cwd(), 'logs'),
            upload: path.resolve(process.cwd(), 'upload')
        },
        qiniu: {
            AK: '**',
            SK: '**',
            bucket: '**',
            domain_url: '**',
            avatar_style: '**'
        },
        mail: {
            notice: {
                host: 'smtp.mxhichina.com',
                port: 465,
                secureConnection: true, // 使用 SSL
                auth: {
                    user: '**',
                    pass: '**'
                }
            }
        },
        github: github,
        qq: qq,
        https: {
            key: fs.readFileSync(path.join(__dirname, '../https/privatekey.pem')),
            cert: fs.readFileSync(path.join(__dirname, '../https/certificate.pem'))
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