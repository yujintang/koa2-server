/**
 * Created by yujintang on 2017/3/1.
 */
'use strict';

const Mongo = require('../model'),
    _ = require('lodash'),
    ck = require('../lib/check');


/**
 * 查询所有用户
 */
exports.find = async(ctx) => {
    try {
        let {limit, offset} = ctx.query;
        let info = await Mongo.User.find().limit(+limit || 20).skip(+offset || 0);
        if (!info) {
            throw new Error('没有该用户信息');
        }
        ctx.body = info;
    } catch (e) {
        ctx.status = 400;
        ctx.body = e.message
    }
};


/**
 * 查询用户信息
 */
exports.findOne = async(ctx) => {
    try {
        let id = ctx.params.id;
        let info = await Mongo.User.findById(id);
        if (!info) {
            throw new Error('没有该用户信息');
        }
        ctx.body = info;
    } catch (e) {
        ctx.status = 400;
        ctx.body = e.message
    }
};

/**
 * 修改用户信息
 */
exports.modifyOne = async(ctx) => {
    try {
        let id = ctx.params.id;
        let session = ctx.session;
        if(id !== session.user._id){
            throw new Error('不能修改其他人信息')
        }
        let fields = ctx.fields;
        let {name, avatar_url, email, location, phone} = fields;
        ck.params(fields, ['name', 'avatar_url', 'email', 'location', 'phone']);
        ck.email(email);
        ck.phone(phone);
        let entity = _.merge({}, _.pick(fields, ['name', 'avatar_url', 'email', 'location', 'phone']));
        ctx.body = await Mongo.Corp.update({_id: id}, entity);
    } catch (e) {
        ctx.status = 400;
        ctx.body = e.message
    }
};