/**
 * Created by yujintang on 2017/7/17.
 */
'use strict';

const opt = require('./common/option');

module.exports = (sequelize, DataTypes) => {
    const model = {
        share_id: {
            type: DataTypes.UUID,
            comment: "分享ID",
            field: 'share_id',
            allowNull: false,
            primaryKey: true
        },
        user_id: {
            type: DataTypes.UUID,
            comment: "用户ID",
            field: 'user_id',
        },
        banner: {
            type: DataTypes.STRING(200),
            comment: "图片",
            field: "banner"
        },
        desc: {
            type: DataTypes.STRING(200),
            comment: "描述",
            field: "desc"
        },
        note:{
            type: DataTypes.TEXT,
            comment: "备注",
            field: "note"
        },
        status:{
            type: DataTypes.BOOLEAN,
            comment: "状态",
            field: "status"
        }
    };
    return sequelize.define('tbl_share', model, opt);
};