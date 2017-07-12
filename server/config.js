/**
 * Created by yujintang on 2017/3/15.
 */
'use strict';

const configure = function () {

    const path = require('path'),
    _ = require('lodash'),
    fs = require('fs-extra');

    let config = {

        system: {
            port: 3000,
            cookieKey: 'koa project',
            PROJECT_NAME: 'koa2-server'
        },
        redis: {
            host: '127.0.0.1',
            port: '6379',
            db: 0,
            pass: '123456'
        },
        mongo: {
            host: '127.0.0.1',
            port: '27017',
            db: 'koa2',
            user: 'test',
            pass: '123456'
        },
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
        github: {
            client_id: '**',
            client_secret: '**',
            redirect_url: '**',
            home_url: '**'
        },
        qq: {
            app_id: '**',
            app_key: '**',
            redirect_url: '**'
        },
        https: {
            key: fs.readFileSync(path.join(__dirname, '../https/privatekey.pem')),
            cert: fs.readFileSync(path.join(__dirname, '../https/certificate.pem'))
        },
        wx:{
            app_id: '**',
            app_key: '**',
            token: '**'
        }
    };

    //目录不存在，则创建
    let keys = Object.keys(config.path);
    keys.forEach(key => {
        fs.ensureDirSync(config.path[key])
    });

    //合并临时环境变量
    const envJsonPath = process.cwd() + '/.env/' + 'env.json';
    fs.ensureFileSync(envJsonPath);
    let envConfig = fs.readJsonSync(envJsonPath, {throws: false});

    return _.merge({}, config, envConfig);
}();

module.exports = configure;
global.config = configure;
