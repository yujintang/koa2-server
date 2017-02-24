/**
 * Created by yujintang on 2017/2/23.
 */
'use strict';

var Mongo = require('../model');
var Result = global.Result;
var Crypto = require('../lib/crypto');
var redis = global.redisDb;
var config = global.config;
const _ = require('lodash');


/**
 * 发送通知邮件
 */

exports.sendMail = async(ctx) => {


    const mail = require('../lib/email');
    try {
        let body = ctx.request.fields;
        let {name, email, content} = body;

        if (!email || !content) {
            throw new Error('请输入您的邮箱地址和内容')
        }

        await mail.notice(_.pick(body, ['name', 'email', 'content']));
        return ctx.body = new Result(Result.OK, '成功');
    } catch (e) {
        return ctx.body = new Result(Result.ERROR, e.message)
    }
};

/**
 * 拉取更新代码
 */
exports.gitPull = async(ctx) => {
    
    require('shelljs/global');
    try {
        cd ('/opt');
        let result = void 0;
        if(ctx.method == 'GET'){
            result = ls();
        }else {
            let name = ctx.params.name;
            cd(name);
            result = exec('./reload.sh');
        }
        if(result.stderr){
            throw new Error(result.stderr);
        }
        ctx.body = new Result(Result.OK, void 0, {data: result})
    } catch (e) {
        return ctx.body = new Result(Result.ERROR, e.message);
    }
    
};