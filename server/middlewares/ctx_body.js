/**
 * Created by yujintang on 2017/2/27.
 */
'use strict';

module.exports = async(ctx, next) => {

    try {
        await next();
        switch (ctx.status) {
            case 404:
                ctx.body = {
                    code: 0,
                    message: '请求错误',
                    content: {method: ctx.method, host: ctx.host, url: ctx.originalUrl}
                };
                break;
            case /^(1|2|3)/.test(ctx.status) && ctx.status:
                ctx.body = {code: 1, message: '成功', content: ctx.body || {}};
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