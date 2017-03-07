/**
 * Created by yujintang on 2017/2/13.
 */
'use strict';

const formidable = require('formidable'),
    fs = require('fs'),
    _ = require('lodash'),
    path = require('path'),
    crypto = require('../lib/crypto'),
    qiniu = require('../lib/qiniu'),
    Mongo = require('../model'),
    cfg_upload = global.config.path.upload;

exports.upload = async(ctx) => {
    try {

        let files = ctx.files;
        let fields = ctx.fields;
        let route_param = ctx.query.type; //图片可添加类型，放在url上面  如：?type=avatar

        //base64转文件
        let fieldsKeys = Object.keys(fields);
        for (let key of fieldsKeys) {
            let base64 = fields[key];
            if (_.isArray(base64)) {
                fields[key] = null
            } else {
                let file = base64ToFiles(base64, cfg_upload);
                files.push(file);
                fields[key] = null;
            }
        }

        let result = [];

        let keys = Object.keys(files);
        for (let key in keys) {
            let {name, path, type} = files[key];
            var file_ext = path.substring(path.lastIndexOf('.'));
            let new_name = crypto.UUID() + file_ext;

            let model = {
                name: name,
                user: '',
                type: type,
                param: route_param,
                url_local: path,
                url_qiniu: global.config.qiniu.domain_url + new_name
            };
            await qiniu.upload(new_name, path, route_param);
            let m_file = await Mongo.File.create(model);
            result.push(m_file);
        }
        ctx.body = {list: result};
    } catch (e) {
        log.db.error(e);
        ctx.status = 400;
        ctx.body = e.message;
    }


    /**
     * base64转文件
     * @param base64File base64文件
     * @param path_upload 要写入的目录
     */
    function base64ToFiles(base64File, path_upload) {

        var base64 = base64File.replace(/^data:image\/\w+;base64,/, '');
        var base64Type = base64File.match(/^(?:data:([^;]+);)/) && base64File.match(/^(?:data:([^;]+);)/)[1];
        var base64Format = base64Type.replace('image/', '.');
        var buf = new Buffer(base64, 'base64');
        var base64Name = crypto.UUID() + base64Format;
        var base64Path = path.resolve(path_upload, base64Name);
        fs.writeFileSync(base64Path, buf);

        let file = {
            name: base64Name,
            size: buf.length,
            type: base64Type,
            path: base64Path
        };

        return file;
    }
};
