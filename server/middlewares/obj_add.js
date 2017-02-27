/**
 * Created by yujintang on 2017/2/24.
 */
'use strict';

/**
 * 处理koa-better-body 返回undefined 情况
 */
module.exports = async(ctx, next) => {

    try {
        ctx.body = ctx.request.body || {};      //  if buffer or text
        ctx.files = ctx.request.files || {};    //  if multipart or urlencoded
        ctx.fields = ctx.request.fields || {};  //  if json
        await next();
    } catch (e) {
        ctx.status = 500;
        ctx.body = e.message
    }
};