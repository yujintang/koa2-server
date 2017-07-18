/**
 * Created by yujintang on 2017/2/7.
 */


const mongoose = require('mongoose'),
  fs = require('fs-extra'),
  path = require('path'),
  config = global.config,
  cfg_mongo = config.mongo,
  cfg_path = config.path;

mongoose.Promise = global.Promise;

const opts = {
    user: cfg_mongo.user,
    pass: cfg_mongo.pass,
    auth: {
        authdb: 'admin'
    }
};
const uri = `mongodb://${cfg_mongo.host}:${cfg_mongo.port}/${cfg_mongo.db}`;
mongoose.connect(uri, opts);

const child = fs.readdirSync(cfg_path.mongo_model);
for (let model of child) {
    let model_path = path.resolve(cfg_path.mongo_model, model)
    fs.statSync(model_path).isFile() && require(model_path);
}
global.mongoDb = mongoose;
module.exports = mongoose;