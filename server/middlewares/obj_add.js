/**
 * Created by yujintang on 2017/2/24.
 */
'use strict';

//处理koa-better-body 返回undefined 情况
module.exports = async(ctx, next) => {

    try {
        ctx.request.files = ctx.request.files || {};
        ctx.request.fields = ctx.request.fields || {};
        await next();
    } catch (e) {
        ctx.status = 500;
        ctx.body = new Result(Result.ERROR, e.message)
    }
};