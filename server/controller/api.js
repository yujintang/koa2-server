/**
 * Created by yujintang on 2017/2/23.
 */
'use strict';

var Mongo = require('../model');
var Crypto = require('../lib/crypto');
var redis = global.redisDb;
var config = global.config;
const _ = require('lodash');


/**
 * 发送通知邮件
 */

exports.sendMail = async(ctx) => {
    try {
        const mail = require('../lib/email');
        let body = ctx.request.fields;
        let {name, email, content} = body;

        if (!email || !content) {
            throw new Error('请输入您的邮箱地址和内容')
        }

        await mail.notice(_.pick(body, ['name', 'email', 'content']));
        ctx.body = {};
    } catch (e) {
        ctx.status = 400;
        ctx.body = e.message
    }
};
