/**
 * Created by yujintang on 2017/2/7.
 */
'use strict';

const Mongo = require('../model'),
    Crypto = require('../lib/crypto'),
    redis = global.redisDb,
    https = require('https'),
    Promise = require('bluebird'),
    qs = require('querystring'),
    _ = require('lodash'),
    ck = require('../lib/check'),
    request = require('request');
Promise.promisifyAll(request);


/**
 * 普通登录
 */
exports.login = async(ctx) => {
    try {
        let fields = ctx.fields;
        let {email, password} = fields;
        ck.params(fields, ['email', 'password']);
        ck.email(email);
        password = Crypto.MD5(password);
        let user = await Mongo.User.findOne({email: email, password: password});
        if(!user){
            throw new Error('登录失败');
        }
        ctx.session.user = _.pick(user, ['_id']);
        ctx.body = user;
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

        let query = ctx.query, session = ctx.session;
        let {code, state} = query;
        if (state != session.state) {
            throw new Error('请稍后继续');
        }
        let params = {
            client_id: cfg_github.client_id,
            client_secret: cfg_github.client_secret,
            code: code
        };
        //获取 access_token
        let reqTk = await request.postAsync('https://github.com/login/oauth/access_token', {json: params});
        //判断request请求是否正确返回
        if (!/^(2)/.test(reqTk.statusCode)) {
            throw new Error(reqTk.body);
        }
        let access_token = reqTk.body.access_token;
        //获取github user 信息
        let reqUser = await request.getAsync({
            headers: {'Authorization': 'token ' + access_token, 'User-Agent': 'request'},
            url: 'https://api.github.com/user'
        });
        //判断request请求是否正确返回
        if (!/^(2)/.test(reqUser.statusCode)) {
            throw new Error(reqUser.body);
        }
        //检查是否登录，登录绑定，没登录则注册或登录
        let gitBody = JSON.parse(reqUser.body);
        let gitHub_id = gitBody.id;

        if (!session.user) { //没有登录
            let user = await Mongo.User.findOne({gitHub_id: gitHub_id});
            if (user) {
                session.user = _.pick(user, ['_id']);
                ctx.redirect(cfg_github.home_url)
            } else {

                let entity = {
                    name: gitBody.name,
                    avatar_url: gitBody.avatar_url,
                    email: gitBody.email,
                    gitHub_id: gitBody.id,
                    location: gitBody.location
                };
                let createUser = await Mongo.User.create(entity);
                session.user = _.omit(createUser, ['_id']);
                ctx.redirect(cfg_github.home_url)
            }
        } else { //已登录
            let user = await Mongo.User.findOne({gitHub_id: gitHub_id});
            if (user && session.user._id != user._id) {
                throw new Error('该账号已经被绑定');
            } else {
                let updateUser = await Mongo.User.update({_id: session.user._id}, {gitHub_id: gitHub_id});
                ctx.redirect(cfg_github.home_url)
            }
        }
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