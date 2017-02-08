/**
 * Created by yujintang on 2017/2/7.
 */


'use strict';

var Model = require('../model');
var Result = global.Result;


/**
 * 注册用户
 */

exports.register = async (ctx) =>{

    let body = ctx.request.body;
    let model = {
        account: body.account,
        name: body.name,
        password: body.password
    };
    let x = await Model.user.create(model);

    ctx.body = new Result(Result.OK, void 0, x);
};
