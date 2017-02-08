/**
 * Created by yujintang on 2017/2/7.
 */

"use strict";

let router = require('koa-router')();

/**
 * 主页
 */
router.get('/', async (ctx, next) => {
    ctx.body = '却回公司API主页';
});




module.exports = router;