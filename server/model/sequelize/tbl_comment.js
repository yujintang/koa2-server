/**
 * Created by yujintang on 2017/7/17.
 */
'use strict';

const opt = require('./common/option');

module.exports = (sequelize, DataTypes) => {
    const model = {
        comment_id: {
            type: DataTypes.UUID,
            comment: "留言ID",
            field: 'comment_id',
            allowNull: false,
            primaryKey: true
        },
        share_id: {
            type: DataTypes.UUID,
            comment: "分享ID",
            field: 'share_id'
        },
        user_id: {
            type: DataTypes.UUID,
            comment: "用户ID",
            field: 'user_id',
        },
        comment:{
            type: DataTypes.STRING(128),
            comment: "评论",
            field: "comment"
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
    return sequelize.define('tbl_comment', model, opt);
};