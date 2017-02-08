/**
 * Created by yujintang on 2017/2/7.
 */
 
 
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var cfg_mongo = require('../config').mongo;
var log = global.log;

var uri = `mongodb://${cfg_mongo.host}:${cfg_mongo.port}/${cfg_mongo.db}`;
mongoose.connect(uri);

var db = mongoose.connection;
db.on('connected', () => {
    log.system.info('Mongoose connected to ' + uri + `,  Address: http://${cfg_mongo.host}:${+cfg_mongo.port + 1000}`);
});
db.on('error', (err) => {
    log.system.error('Mongoose connection error: ' + err);
});
global.mongo = mongoose;