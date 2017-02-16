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

    let files = ctx.request.files;
    let fileArray = [];
    let newFile = void 0;
    let keys = Object.keys(files);
    keys.forEach(key => {
        var filePath = files[key].path;
        var fileExt = filePath.substring(filePath.lastIndexOf('.'));
        let newName = crypto.UUID() + fileExt;
        newFile = path.join(global.config.path.upload, newName);
        fs.renameSync(filePath, newFile);
        fileArray.push(newFile);
        // qiniu.upload(newName, newFile);
    });

    ctx.body = new Result(Result.OK, '成功', {array: fileArray});
};