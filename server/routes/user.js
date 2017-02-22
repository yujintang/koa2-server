/**
 * Created by yujintang on 2017/2/7.
 */

"use strict";

const router = require('koa-router')();
const ctUser = require('../controller/user');

/**
 * 登录
 */
router.post('/register', ctUser.register);

module.exports = router;