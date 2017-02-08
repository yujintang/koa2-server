/**
 * Created by yujintang on 2017/2/8.
 */



"use strict";
let redisDb = function () {
    let redis = require('redis');
    let config = require('../config');
    var cfg_rds = config.redis;
    
    const db = redis.createClient({
        host: cfg_rds.host,
        port: cfg_rds.port,
        password: cfg_rds.pass,
        db:cfg_rds.db,
        socket_keepalive: true,
        retry_unfulfilled_commands: true
    });

    return db;

}();

global.redisDb = redisDb;

module.exports = redisDb;