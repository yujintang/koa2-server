/**
 * Created by yujintang on 2017/2/7.
 */
"use strict";

const router = require('koa-router')();

/**
 * 主页
 */
router.all('/', async (ctx, next) => {
    console.log('sd')
    ctx.body = '却回公司API主页';
});

module.exports = router;