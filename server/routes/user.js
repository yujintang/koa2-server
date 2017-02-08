/**
 * Created by yujintang on 2017/2/7.
 */

"use strict";

let router = require('koa-router')();
let redisDb = global.redisDb;
let ctUser = require('../controller/user');

/**
 * 登录
 */
router.post('/register', ctUser.register);

module.exports = router;