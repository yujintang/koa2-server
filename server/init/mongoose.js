/**
 * Created by yujintang on 2017/2/7.
 */
 
 
const mongoose = require('mongoose');
const cfg_mongo = global.config.mongo;
const log = global.log;

mongoose.Promise = global.Promise;

const uri = `mongodb://${cfg_mongo.host}:${cfg_mongo.port}/${cfg_mongo.db}`;
mongoose.connect(uri);

var db = mongoose.connection;
db.on('connected', () => {
    log.system.info('Mongoose connected to ' + uri + `,  Address: http://${cfg_mongo.host}:${+cfg_mongo.port + 1000}`);
});
db.on('error', (err) => {
    log.system.error('Mongoose connection error: ' + err);
    process.exit(1);
});

global.mongo = mongoose;