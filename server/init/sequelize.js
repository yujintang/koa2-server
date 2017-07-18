/**
 * Created by yujintang on 2017/7/17.
 */
'use strict';
const Sequelize = require('sequelize'),
  fs = require('fs-extra'),
  path = require('path'),
  config = global.config,
  cfg_sequzlize = config.sequelize,
  cfg_path = config.path;

const sequelizeDb = new Sequelize(cfg_sequzlize.db, cfg_sequzlize.user, cfg_sequzlize.pass, cfg_sequzlize.opt);

const child = fs.readdirSync(cfg_path.sequelize_model);
for (let model of child) {
    let model_path = path.resolve(cfg_path.sequelize_model, model);
    fs.statSync(model_path).isFile() && sequelizeDb.import(model_path);
}

const model_sync = async (DB) => {
    await DB.sync({logging: false})
};
model_sync(sequelizeDb);

global.sequelizeDb = sequelizeDb;
module.exports = sequelizeDb;