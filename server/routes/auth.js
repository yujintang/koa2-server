/**
 * Created by yujintang on 2017/2/7.
 */

"use strict";

const router = require('koa-router')();
const auth = require('../controller/auth');

/**
 * 普通登录
 */
router.post('/login', auth.login);

/**
 * github 操作
 */
// github登录
router.get('/github', auth.github);
// github回调
router.all('/githubCb', auth.githubCb);

/**
 * 登出
 */
router.delete('/logout', auth.logout);


module.exports = router;