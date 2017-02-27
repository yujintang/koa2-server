/**
 * Created by yujintang on 2017/2/7.
 */

"use strict";

const router = require('koa-router')();
const api = require('../controller/api');

/**
 * 发送邮件
 */
router.post('/sendMail', api.sendMail);

module.exports = router;