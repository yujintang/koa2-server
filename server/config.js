'use strict';

const configure = function () {

    const path = require('path');
    const fs = require('fs');

    var port,
        PROJECT_NAME = 'quehui',
        mongo, redis, github, qq, wx;

    switch (process.env.NODE_ENV) {
        case 'dev':
            port = 12312;
            break;
        case 'real':
            port = 3000;
            mongo = {
                host: '127.0.0.1',
                port: '27017',
                db: 'quehui',
                user: 'mongo',
                pass: 'mongo'
            };
            redis = {
                host: '127.0.0.1',
                port: '6379',
                db: 0,
                pass: 'redis666'
            };
            github = {
                client_id: '5cfe2b646f07fe4c8b79',
                client_secret: '30d46df6bce48b358218d675f124148b8b1f407f',
                redirect_url: 'http://www.7diary.com/qh_api/auth/githubCb',
                home_url: 'http://www.7diary.com/qh_back/#/home'
            };
            qq = {
                app_id: '101382837',
                app_key: 'b3c014b9676ab3cc380479f447652944',
                redirect_url: 'http://www.7diary.com/qh_api/auth/qqCb',
                home_url: 'http://www.7diary.com/qh_back/#/home'
            };
            wx = {
                app_id: 'wxeaacd3ecb412444a',
                app_key: '6322087ebc1267c32e9412702e5257dd',
                token: 'yujintang'
            };
            break;
        default:
            port = 12121;
            mongo = {
                host: '120.27.115.24',
                port: '27017',
                db: 'quehui',
                user: 'mongo',
                pass: 'mongo'
            };
            redis = {
                host: '120.27.115.24',
                port: '6379',
                db: 0,
                pass: 'redis666'
            };
            github = {
                client_id: '180b0603101d0a22aaeb',
                client_secret: '86a6a16dc1711ae2f7d5a12babb2e3f114c9b4de',
                redirect_url: 'http://192.168.3.109:8080/qh/auth/githubCb',
                home_url: 'http://192.168.3.109:8080/#/home'
            };
            qq = {
                app_id: '101382837',
                app_key: 'b3c014b9676ab3cc380479f447652944',
                redirect_url: 'http://127.0.0.1:12121/auth/qqCb',
                home_url: 'http://192.168.3.109:8080/#/home'
            };
            wx = {
                app_id: 'wxeaacd3ecb412444a',
                app_key: '6322087ebc1267c32e9412702e5257dd',
                token: 'yujintang'
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
            AK: 'UFmgpsHCF5goS2eEk3-CYiTHiF6KOqCqsi4C2R8Y',
            SK: '40HFTpsLjHpZ-7udjoRbqI-zkiLTIrcf1jJGvAQ8',
            bucket: '7diary',
            domain_url: 'http://images.7diary.com/',
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
            }
        },
        github: github,
        qq: qq,
        https: {
            key: fs.readFileSync(path.join(__dirname, '../https/privatekey.pem')),
            cert: fs.readFileSync(path.join(__dirname, '../https/certificate.pem'))
        },
        wx: wx
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