/**
 * Created by yujintang on 2017/2/7.
 */
'use strict';

var Mongo = require('../model');
var Crypto = require('../lib/crypto');
var redis = global.redisDb;


/**
 * 注册用户
 */

exports.register = async(ctx) => {

    try {
        let body = ctx.fields;
        let {account, password} = body;
        if (!account || !password) {
            throw new Error('缺少参数');
        }
        let exist = await Mongo.User.findOne({account: account});
        if (exist) {
            throw new Error('该账号已经被注册');
        }
        let entity = {
            account: account,
            password: Crypto.MD5(password)
        };
        let info = await Mongo.User.create(entity);

        ctx.session.user = info;
        ctx.body = info;
    } catch (e) {
        ctx.status = 400;
        return ctx.body = e.message
    }
};

/**
 * 登录
 */

exports.login = async(ctx) => {

    try {
        let body = ctx.fields;
        let {account, password} = body;
        if (!account || !password) {
            throw new Error('缺少参数');
        }

        let info = await Mongo.User.findOne({account: account, password: Crypto.MD5(password)});
        if (!info) {
            throw new Error('该账号不存在');
        }

        ctx.session.user = info;
        ctx.body = info;
    } catch (e) {
        ctx.status = 400;
        return ctx.body = e.message
    }
};

/**
 * 登出
 */

exports.logout = async(ctx) => {

    try {
        ctx.session.user = null;
        ctx.body = {};
    } catch (e) {
        ctx.status = 400;
        return ctx.body = e.message
    }
};