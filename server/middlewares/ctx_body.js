/**
 * Created by yujintang on 2017/2/27.
 */
'use strict';

/**
 * 统一返回相同格式的Result
 * @param ctx
 * @param next
 */
module.exports = async(ctx, next) => {

    try {
        await next();
        switch (ctx.status) {
            case 400: //业务期间，抛出的异常
                ctx.status = 200;
                ctx.body = {code: 0, message: ctx.body || '失败'};
                break;
            case 404: //没有这个接口
                ctx.status = 404;
                ctx.body = {
                    code: 0,
                    message: '请求错误',
                    content: {method: ctx.method, host: ctx.host, url: ctx.originalUrl}
                };
                break;
            case /^(1|2|3)/.test(ctx.status) && ctx.status:
                if (!notFormat(ctx.originalUrl)) {
                    ctx.body = {code: 1, message: '成功! ', content: ctx.body || {}};
                }
                break;
            default:
                ctx.body = {code: 0, message: ctx.body || '失败'};
                break;
        }
    } catch (e) {
        ctx.status = 500;
        ctx.body = {code: 0, message: e.message}
    }
};

/**
 * 该路由下的ctx.body 原样返回，无需经过Result包装
 * @param route
 * @returns {boolean}
 */
function notFormat(route) {
    return ['/api/wx'].includes(route)
}