/**
 * Created by yujintang on 2017/3/8.
 */
'use strict';

const Mongo = require('../model'),
    _ = require('lodash'),
    ck = require('../lib/check');

/**
 * 查询团队信息
 */
exports.find = async(ctx) => {
    try {
        let info = await Mongo.Team.findOne();
        if (!info) {
            throw new Error('没有团队信息');
        }
        ctx.body = info;
    } catch (e) {
        ctx.status = 400;
        ctx.body = e.message
    }
};

/**
 * 修改团队信息
 */
exports.modify = async(ctx) => {
    try {
        let fields = ctx.fields;
        let entity = _.merge({}, _.pick(fields, ['history', 'skill', 'member']));
        ctx.body = await Mongo.Team.update({}, entity, {upsert: true});
    } catch (e) {
        ctx.status = 400;
        ctx.body = e.message
    }
};
 
