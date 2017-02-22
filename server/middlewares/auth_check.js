/**
 * Created by yujintang on 2017/2/22.
 */
'use strict';

/**
 * auth 中间件，所有需要验证路由，必须有 '/auth_'
 * @param ctx
 * @param next
 */
module.exports = async (ctx, next) => {

    try {
        let route = ctx.originalUrl;
        let reg = /\/auth_/;
        if(reg.test(route)){
            if(!ctx.session.user){
                throw new Error('请先登录')
            }
        }
        await next();
    } catch (e) {
        ctx.status = 401;
        ctx.body = new Result(Result.ERROR, e.message)
    }
};