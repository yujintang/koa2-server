/**
 * Created by yujintang on 2017/2/23.
 */
'use strict';

var Mongo = require('../model');
var Result = global.Result;
var Crypto = require('../lib/crypto');
var redis = global.redisDb;
var config = global.config;


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
        let toUser = {
            from:config.mail.notice.auth.user,
            to: email,
            subject: '[放心猿]有新的通知',
            html: `<p style="text-align:center;">放心猿的信</p >
                   <p>dear ${name}:</p >
                   <p>    感谢您的来信，我们会尽快联系您！</p>
                   <P> 原文：${content}</P>`
        };

        let sendUser = await mail.notice(toUser);
        return ctx.body = new Result(Result.OK, '成功', sendUser);
    } catch (e) {
        return ctx.body = new Result(Result.ERROR, e.message)
    }
};