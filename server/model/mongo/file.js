/**
 * Created by yujintang on 2017/2/21.
 */
'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var temp = new Schema({

    name: {
        type: String
    },
    user: {
        type: String
    },
    type: {
        type: String
    },
    param: {
        type: String
    },
    url_local: {
        type: String
    },
    url_qiniu: {
        type: String
    },
    note: {
        type: String
    }

}, {
    versionKey: false //控制 __v 的输出
});

module.exports = mongoose.model('File', temp);