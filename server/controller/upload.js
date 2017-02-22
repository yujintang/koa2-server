/**
 * Created by yujintang on 2017/2/13.
 */
'use strict';


exports.upload = async(ctx) => {

    const formidable = require('formidable'),
        fs = require('fs'),
        crypto = require('../lib/crypto'),
        Result = global.Result,
        log = global.log;
    let qiniu = require('../lib/qiniu');
    let Mongo = require('../model');
    let cfg_upload = global.config.path.upload;

    try {
        let files = ctx.request.files;
        let fields = ctx.request.fields;
        let route_param = void 0;
        if (/^(?:\/upload\/)/.test(ctx.originalUrl)) {
            route_param = ctx.originalUrl.match(/^(?:\/upload\/(\w+))/)[1];
        }

        //base64转文件
        if ('base64' in fields) {
            var base64File = fields.base64;
            let file = base64ToFiles(base64File, cfg_upload);
            files.push(file);
            fields.base64 = null;
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
        ctx.body = new Result(Result.OK, '成功', {list: result});
    } catch (e) {
        log.db.error(e);
        return ctx.body = new Result(Result.ERROR, '失败', e);
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
