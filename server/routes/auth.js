/**
 * Created by yujintang on 2017/2/7.
 */

"use strict";

const router = require('koa-router')();
const auth = require('../controller/auth');

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