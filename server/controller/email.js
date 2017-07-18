/**
 * Created by yujintang on 2017/2/23.
 */
'use strict';

const Mongo = global.mongoDb.models,
    Crypto = require('../lib/crypto'),
    redis = global.redisDb,
    config = global.config,
    _ = require('lodash'),
    ck = require('../lib/check');

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
