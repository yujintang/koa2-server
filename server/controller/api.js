/**
 * Created by yujintang on 2017/2/23.
 */
'use strict';

var Mongo = require('../model');
var Crypto = require('../lib/crypto');
var redis = global.redisDb;
var config = global.config;
const _ = require('lodash');
let ck = require('../lib/check');

/**
 * 发送通知邮件
 */

exports.sendMail = async(ctx) => {
    try {
        const mail = require('../lib/email');
        let body = ctx.fields;
        let {name, email, content} = body;
        ck.params(body, ['email', 'content']);
        ck.email(email);
        await mail.notice(_.pick(body, ['name', 'email', 'content']));
        ctx.body = {};
    } catch (e) {
        ctx.status = 400;
        ctx.body = e.message
    }
};
