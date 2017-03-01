/**
 * Created by yujintang on 2017/2/8.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({

    name: {
        type: String
    },
    avatar_url: {
        type: String
    },
    password: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
    gitHub_id: {
        type: String
    },
    wx_id: {
        type: String
    },
    location: {
        type: String
    },
    type: {
        type: String,
        default: 'user'
    }

}, {
    versionKey: false //控制 __v 的输出
});

UserSchema.index({
    account: 1
});

module.exports = mongoose.model('User', UserSchema);