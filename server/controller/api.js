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

exports.sendMail = async (ctx) => {


    const mail = require('../lib/email');
    try {
        let body = ctx.request.fields;
        let {name, email, content} = body;

        if(!email || !content){
            throw new Error('请输入您的邮箱地址和内容')
        }

        await mail.notice(_.pick(body, ['name', 'email', 'content']));
        return ctx.body = new Result(Result.OK, '成功');
    } catch (e) {
        return ctx.body = new Result(Result.ERROR, e.message)
    }
};