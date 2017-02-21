/**
 * Created by yujintang on 2017/2/7.
 */

const cfg_rds = global.config.redis;
const redisStore = require('koa-redis');
const maxAge = 30 * 24 * 3600 * 1000;

exports.opt_rds = {
    store: redisStore({
        host: cfg_rds.host,
        port: cfg_rds.port,
        db: cfg_rds.db,
        retry_unfulfilled_commands: true
    }),
    cookie: ctx => ({
        maxAge: ctx.session.user ? maxAge : 0,
        signed: true
    })
};
