/**
 * Created by yujintang on 2017/2/27.
 */
'use strict';

    module.exports = async(ctx, next) => {

        try {
            await next();
            if (/^(4|5)/.test(ctx.status)) {
                ctx.body = {
                    code: 0,
                    message: ctx.body || '失败'
                }
            }else {
                ctx.body = {
                    code: 1,
                    message: '成功',
                    content: ctx.body || {}
                }
            }
        } catch (e) {
            ctx.status = 500;
            ctx.body = {
                code: 0,
                message: e.message
            }
        }
    };