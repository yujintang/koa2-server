/**
 * Created by yujintang on 2017/2/7.
 */

"use strict";

const router = require('koa-router')();
const auth = require('../controller/auth');

/**
 * 注册并登录
 */
router.post('/register', auth.register);

/**
 * 登录
 */
router.post('/login', auth.login);

/**
 * 登出
 */
router.delete('/logout', auth.logout);

/**
 * github登录
 */
router.get('/github', auth.github);

/**
 * github回调
 */
router.all('/githubCb', auth.githubCb);
module.exports = router;