/**
 * Created by yujintang on 2017/2/7.
 */
"use strict";

const router = require('koa-router')();

/**
 * 主页
 */
router.all('/', async (ctx, next) => {

    ctx.body = '欢迎您来到 🐒🐒 🐒  世界';
});

module.exports = router;