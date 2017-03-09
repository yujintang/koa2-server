/**
 * Created by yujintang on 2017/2/7.
 */

"use strict";

const router = require('koa-router')();
const email = require('../controller/email');
const corp = require('../controller/corp');
const team = require('../controller/team');
const user = require('../controller/user');
const product = require('../controller/product');
const upload = require('../controller/upload');
const banner = require('../controller/banner');

/**
 * 发送邮件
 */
router.post('/sendMail', email.sendMail);

/**
 * 上传文件
 */
router.post('/auth_upload', upload.upload);

/**
 * 公司 操作
 */
//查询公司信息
router.get('/corp', corp.find);
//修改公司
router.post('/auth_corp', corp.modify);

/**
 *  用户 操作
 */
//查询user列表
router.get('/user', user.find);
//查询单个user
router.get('/user/:id', user.findOne);
//修改单个user
router.put('/auth_user/:id', user.modifyOne);

/**
 *  产品 操作
 */
//查询产品列表
router.get('/product', product.find);
//新增单个产品
router.post('/auth_product', product.newOne);
//查询单个产品
router.get('/product/:id', product.findOne);
//修改单个产品
router.put('/auth_product/:id', product.modifyOne);
//删除或恢复一个产品
router.patch('/auth_product/:id', product.patchOne);

/**
 *  队伍 介绍
 */
//查询队伍信息
router.get('/team', team.find);
//修改队伍信息
router.post('/auth_team', team.modify);

/**
 *  背景banner
 */
//查询队伍信息
router.get('/banner', banner.find);
//修改队伍信息
router.post('/auth_banner', banner.modify);

module.exports = router;