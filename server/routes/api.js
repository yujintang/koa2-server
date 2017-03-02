/**
 * Created by yujintang on 2017/2/7.
 */

"use strict";

const router = require('koa-router')();
const email = require('../controller/email');
const corp = require('../controller/corp');
const user = require('../controller/user');
const upload = require('../controller/upload');

/**
 * 发送邮件
 */
router.post('/sendMail', email.sendMail);

/**
 * 上传文件
 */
router.post('/auth_upload', upload.upload);

/**
 * corp 操作
 */
//查询公司信息
router.get('/corp', corp.corpFind);
//修改公司
router.post('/corp', corp.corpModify);

/**
 *  user 操作
 */
//查询user列表
router.get('/user', user.find);
//查询单个user
router.get('/user/:id', user.findOne);
//修改单个user
router.post('/auth_user/:id', user.modifyOne);

module.exports = router;