/**
 * Created by yujintang on 2017/2/27.
 */
'use strict';

const Mongo = require('../model'),
    _ = require('lodash'),
    ck = require('../lib/check');

/**
 * 查询公司信息
 */
exports.corpFind = async(ctx) => {
    try {
        let info = await Mongo.Corp.findOne({status: 1});
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
exports.corpModify = async(ctx) => {
    try {
        let fields = ctx.fields;
        let {name, logo, info, address, email, phone} = fields;
        ck.params(fields, ['name', 'logo', 'info', 'address', 'email', 'phone']);
        ck.email(email);
        ck.phone(phone);
        let cp = await Mongo.Corp.findOne({status: 1});
        let entity = _.merge({}, _.pick(fields, ['name', 'logo', 'info', 'email', 'manager', 'phone', 'address', 'lng', 'lat']));
        if (cp) {
            ctx.body = await Mongo.Corp.update({_id: cp._id}, entity)
        } else {
            ctx.body = await Mongo.Corp.create(entity)
        }
    } catch (e) {
        ctx.status = 400;
        ctx.body = e.message
    }
};