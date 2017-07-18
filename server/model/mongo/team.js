/**
 * Created by yujintang on 2017/3/8.
 */
'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var temp = new Schema({

    history: {
        type: String
    },
    skill: {
        type: Object
    },
    member: {
        type: Array
    }

}, {
    versionKey: false //控制 __v 的输出
});

module.exports = mongoose.model('Team', temp);