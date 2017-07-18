/**
 * Created by yujintang on 2017/2/27.
 */
'use strict';

const Mongo = global.mongoDb.models,
    _ = require('lodash'),
    ck = require('../lib/check');

/**
 * 查询公司信息
 */
exports.find = async(ctx) => {
    try {
        let info = await Mongo.Corp.findOne();
        if (!info) {
            throw new Error('没有公司信息');
        }
        ctx.body = info;
    } catch (e) {
        ctx.status = 400;
        ctx.body = e.message
    }
};

/**
 * 修改新增公司信息
 */
exports.modify = async(ctx) => {
    try {
        let fields = ctx.fields;
        let {name, logo, info, address, email, phone} = fields;
        ck.params(fields, ['name', 'logo', 'info', 'address', 'email', 'phone']);
        ck.email(email);
        ck.phone(phone);
        let entity = _.merge({}, _.pick(fields, ['name', 'logo', 'info', 'email', 'manager', 'phone', 'address', 'lng', 'lat']));
        ctx.body = await Mongo.Corp.update({}, entity, {upsert: true});
    } catch (e) {
        ctx.status = 400;
        ctx.body = e.message
    }
};