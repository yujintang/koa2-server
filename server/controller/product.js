/**
 * Created by yujintang on 2017/3/3.
 */
'use strict';

const Mongo = require('../model'),
    _ = require('lodash'),
    ck = require('../lib/check');


/**
 * 查询所有产品
 */
exports.find = async(ctx) => {
    try {
        let {limit, offset} = ctx.query;
        let info = await Mongo.Product.find({status: 1}, {'name':1, 'logo': 1, 'info': 1}).limit(+limit || 20).skip(+offset || 0);
        ctx.body = info;
    } catch (e) {
        ctx.status = 400;
        ctx.body = e.message
    }
};


/**
 * 新增产品信息
 */
exports.newOne = async(ctx) => {
    try {
        let fields = ctx.fields;
        let {name, logo, info, detail} = fields;
        ck.params(fields, ['name', 'logo', 'info', 'detail']);
        let entity = _.merge({}, _.pick(fields, ['name', 'logo', 'info', 'detail']));
        ctx.body = await Mongo.Product.create(entity);
    } catch (e) {
        ctx.status = 400;
        ctx.body = e.message
    }
};

/**
 * 查询某个产品
 */
exports.findOne = async(ctx) => {
    try {
        let id = ctx.params.id;
        let info = await Mongo.Product.findById(id);
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
 * 修改产品信息
 */
exports.modifyOne = async(ctx) => {
    try {
        let id = ctx.params.id;
        let fields = ctx.fields;
        let {name, logo, info, detail} = fields;
        let entity = _.merge({}, _.pick(fields, ['name', 'logo', 'info', 'detail']));
        ctx.body = await Mongo.Product.update({_id: id}, entity);
    } catch (e) {
        ctx.status = 400;
        ctx.body = e.message
    }
};

/**
 * 删除某个产品
 */
exports.delOne = async(ctx) => {
    try {
        let id = ctx.params.id;
        let entity = {status: 0};
        ctx.body = await Mongo.Product.update({_id: id}, entity);
    } catch (e) {
        ctx.status = 400;
        ctx.body = e.message
    }
};
