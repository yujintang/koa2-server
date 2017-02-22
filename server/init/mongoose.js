/**
 * Created by yujintang on 2017/2/7.
 */


const mongoose = require('mongoose');
const cfg_mongo = global.config.mongo;
mongoose.Promise = global.Promise;

const opts = {
    user: cfg_mongo.user,
    pass: cfg_mongo.pass,
    auth:{
        authdb: 'admin'
    }
};
const uri = `mongodb://${cfg_mongo.host}:${cfg_mongo.port}/${cfg_mongo.db}`;
mongoose.connect(uri, opts);
