/**
 * Created by yujintang on 2017/2/7.
 */

"use strict";

const router = require('koa-router')();
const api = require('../controller/api');
const corp = require('../controller/corp');
const user = require('../controller/user');

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




/**
 *  查询所有user
 */
router.get('/user', user.find);
/**
 * 查询单个user
 */
router.get('/user/:id', user.findOne);

/**
 * user修改
 */
router.post('/auth_user/:id', user.modifyOne);

module.exports = router;