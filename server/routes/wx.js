/**
 * Created by yujintang on 2017/3/15.
 */
'use strict';

const router = require('koa-router')();

/**
 * token 验证
 */
router.get('/', async (ctx, next) => {
    console.log(ctx.fields);
    console.log(ctx.query);
    console.log(ctx.files);
    ctx.body = ctx.fields;
});

module.exports = router;