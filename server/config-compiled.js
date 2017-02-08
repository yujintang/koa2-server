'use strict';

const configure = function () {

    var port, mongoHost, mongoPort, mongoDb, mongoName, mongoPassword, redisHost, redisPort, redisDb, redisName, redisPassword;

    switch (process.env.NODE_ENV) {
        case 'dev':
            port = 12312;
            break;
        case 'pro':
            port = 3000;
            break;
        default:
            port = 12121;
            redisHost = '127.0.0.1';
            redisPort = '6379';
            redisDb = 1;
            mongoHost = '127.0.0.1';
            mongoPort = '27017';
            break;
    }

    var config = {

        system: {
            port: process.env.PORT || port,
            cookieKey: 'koa project'
        },
        redis: {
            host: redisHost,
            port: redisPort,
            db: redisDb,
            user: redisName,
            pass: redisPassword
        },
        mongo: {
            host: mongoHost,
            port: mongoPort,
            db: mongoDb,
            user: mongoName,
            pass: mongoPassword
        }
    };

    return config;
}();

module.exports = configure;
global.config = configure;

//# sourceMappingURL=config-compiled.js.map