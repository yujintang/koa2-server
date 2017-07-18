/**
 * Created by yujintang on 2017/7/18.
 */
'use strict';

const opt = require('./common/option');

module.exports = (sequelize, DataTypes) => {
    const model = {
        user_id: {
            type: DataTypes.UUID,
            comment: "用户ID",
            field: 'user_id',
            allowNull: false,
            primaryKey: true
        },
        user_name: {
            type: DataTypes.STRING(40),
            comment: "姓名",
            field: "user_name"
        },
        user_avatar: {
            type: DataTypes.STRING(200),
            comment: "头像",
            field: "user_avatar"
        },
        user_code: {
            type: DataTypes.STRING(40),
            comment: "登录账号",
            field: "user_code"
        },
        user_password: {
            type: DataTypes.STRING(200),
            comment: "登录密码",
            field: "user_password"
        },
        phone_number: {
            type: DataTypes.STRING(40),
            comment: "手机",
            field: "phone_number"
        },
        email: {
            type: DataTypes.STRING(100),
            comment: "邮件",
            field: "email"
        },
        gender: {
            type: DataTypes.STRING(10),
            comment: "性别",
            field: "gender"
        },
        wx_openid: {
            type: DataTypes.STRING(128),
            comment: "微信openid",
            field: "wx_openid"
        },
        wx_unionid: {
            type: DataTypes.STRING(128),
            comment: "微信unionid",
            field: "wx_unionid"
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
    return sequelize.define('tbl_user', model, opt);
};