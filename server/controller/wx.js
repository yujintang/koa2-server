/**
 * Created by yujintang on 2017/3/15.
 */
'use strict';

const Mongo = global.mongoDb.models,
    _ = require('lodash'),
    Crypto = require('../lib/crypto'),
    ck = require('../lib/check'),
    cfg_wx = global.config.wx;


/**
 * 微信验证token  https://mp.weixin.qq.com/wiki/8/f9a0b8382e0b77d87b3bcc1ce6fbc104.html
 */
exports.token = async(ctx) => {
    try {
        let query = ctx.query;
        let {signature, nonce, timestamp, echostr} = query;
        let tmpStr = [timestamp, nonce, cfg_wx.token].sort().join('');

        if (signature == Crypto.SHA1(tmpStr)) {
            ctx.body = echostr
        }
    } catch (e) {
        ctx.status = 400;
        ctx.body = e.message
    }
};
