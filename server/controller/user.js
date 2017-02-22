/**
 * Created by yujintang on 2017/2/7.
 */
'use strict';

var Mongo = require('../model');
var Result = global.Result;
var redis = global.redisDb;


/**
 * 注册用户
 */

exports.register = async(ctx) => {

    try {
        let body = ctx.request.fields;
        let {account, name, password} = body;
        ctx.session.qh = 'qwe';
        let model = {
            account: body.account,
            name: body.name,
            password: body.password
        };
        let x = await Mongo.User.create(model);
        let y = await redis.setAsync("qq", x);
        ctx.body = new Result(Result.OK, void 0, {info: x, redis: y});
    } catch (e) {
        return ctx.body = new Result(Result.ERROR, '失败', e)
    }
};
