/**
 * Created by yujintang on 2017/2/7.
 */
'use strict';

const Mongo = require('../model');
const Crypto = require('../lib/crypto');
const redis = global.redisDb;
const https = require('https');
const Promise = require('bluebird');
const qs = require('querystring');
const request = require('request');
Promise.promisifyAll(request);

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
 * github 登录
 */
exports.github = async(ctx) => {
    try {
        const cfg_github = global.config.github;
        let state = Crypto.UUID();
        ctx.session.state = state;
        let path = "https://github.com/login/oauth/authorize?" + qs.stringify({
                client_id: cfg_github.client_id,
                state: state,
                redirect_uri: cfg_github.redirect_url
            });
        //转发到授权服务器
        ctx.redirect(path);
    } catch (e) {
        ctx.status = 400;
        return ctx.body = e.message
    }
};

/**
 * github 登录回调
 */
exports.githubCb = async(ctx) => {
    try {
        const cfg_github = global.config.github;

        let query = ctx.query;
        let {code, state} = query;
        if (state != ctx.session.state) {
            throw new Error('请稍后继续');
        }
        let params = {
            client_id: cfg_github.client_id,
            client_secret: cfg_github.client_secret,
            code: code
        };
        //获取 access_token
        let reqTk = await request.postAsync('https://github.com/login/oauth/access_token', {json: params});
        let access_token = reqTk.body.access_token;

        //获取github user 信息
        let reqUser = await request.getAsync({
            headers: {'Authorization': 'token ' + access_token, 'User-Agent': 'request'},
            url: 'https://api.github.com/user'
        });
        ctx.body = reqUser.body;
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