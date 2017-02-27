/**
 * Created by yujintang on 2017/2/7.
 */

"use strict";

const router = require('koa-router')();
const api = require('../controller/api');
const corp = require('../controller/corp');

/**
 * 发送邮件
 */
router.post('/sendMail', api.sendMail);

/**
 * 公司信息查询
 */
router.get('/corp', corp.corpFind);

/**
 * 公司信息修改
 */
router.post('/corp', corp.corpModify);


module.exports = router;