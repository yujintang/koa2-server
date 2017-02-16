/**
 * Created by yujintang on 2017/2/14.
 */
'use strict';

const formidable = require('formidable');
let cfg_path = global.config.path;

var form = new formidable.IncomingForm();
form.encoding = 'utf-8';
form.uploadDir = cfg_path.upload;
form.hash = 'md5';
form.keepExtensions = true;
form.maxFieldsSize = 10*(1<<20);

module.exports = form;