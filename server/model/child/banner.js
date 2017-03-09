/**
 * Created by yujintang on 2017/3/9.
 */
'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var temp = new Schema({

    large: {
        type: String
    },
    small: {
        type: String
    },
    info: {
        type: String
    }

}, {
    versionKey: false //控制 __v 的输出
});

module.exports = mongoose.model('Banner', temp);