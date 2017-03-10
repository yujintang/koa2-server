/**
 * Created by yujintang on 2017/3/9.
 */
'use strict';

const Mongo = require('../model'),
    _ = require('lodash'),
    ck = require('../lib/check');

/**
 * 查询banner信息
 */
exports.find = async(ctx) => {
    try {
        let info = await Mongo.Banner.findOne();
        if (!info) {
            throw new Error('没有banner信息');
        }
        ctx.body = info;
    } catch (e) {
        ctx.status = 400;
        ctx.body = e.message
    }
};

/**
 * 修改banner信息
 */
exports.modify = async(ctx) => {
    try {
        let fields = ctx.fields;
        ck.params(fields, ['large', 'small', 'info']);
        let entity = _.merge({}, _.pick(fields, ['large', 'small', 'info']));
        ctx.body = await Mongo.Banner.update({}, entity, {upsert: true});
    } catch (e) {
        ctx.status = 400;
        ctx.body = e.message
    }
};