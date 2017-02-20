/**
 * Created by yujintang on 2017/2/13.
 */
'use strict';


exports.upload = async(ctx) => {

    const formidable = require('formidable'),
        fs = require('fs'),
        path = require('path'),
        crypto = require('./crypto'),
        Result = global.Result;
    let qiniu = require('./qiniu');
    let cfg_upload = global.config.path.upload;

    let files = ctx.request.files;
    let fields = ctx.request.fields;
    let type = void 0;
    if(/^(?:\/upload\/)/.test(ctx.originalUrl)){
        type = ctx.originalUrl.match(/^(?:\/upload\/(\w+))/)[1];
    }

    //base64转文件
    if ('base64' in fields) {
        var base64File = fields.base64;
        let file = base64ToFiles(base64File, cfg_upload);
        files.push(file);
        fields.base64 = null;
    }

    let fileArray = [];
    let newFile = void 0;
    let keys = Object.keys(files);
    keys.forEach(key => {
        var filePath = files[key].path;
        var fileExt = filePath.substring(filePath.lastIndexOf('.'));
        let newName = crypto.UUID() + fileExt;
        newFile = path.join(cfg_upload, newName);
        fs.renameSync(filePath, newFile);
        fileArray.push(newFile);
        qiniu.upload(newName, newFile, type);
    });

    ctx.body = new Result(Result.OK, '成功', {array: fileArray});


    /**
     * base64转文件
     * @param base64File base64文件
     * @param path_upload 要写入的目录
     * @returns {{name: *, size: (*|number), type: (*|{manufacturer}|SchemaType|Array|{index: number, input: string}|Boolean), path: (Promise.<*>|*)}}
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
