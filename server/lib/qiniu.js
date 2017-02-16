/**
 * Created by yujintang on 2017/2/14.
 */
'use strict';

module.exports = function () {

    const cfg_qiniu = global.config.qiniu;
    const qiniu = require('qiniu');
    qiniu.conf.ACCESS_KEY = cfg_qiniu.AK;
    qiniu.conf.SECRET_KEY = cfg_qiniu.SK;
    let bucket = cfg_qiniu.bucket;

    let qn = {};

    /**
     * key: 上传到七牛上的文件名，
     * filePath: 要上传的本地路径
     */
    qn.upload = function (key, filePath) {

        //构建上传策略函数，设置回调的url以及需要回调给业务服务器的数据
        function uptoken(bucket, key) {
            var putPolicy = new qiniu.rs.PutPolicy(bucket + ":" + key);
            putPolicy.callbackUrl = '127.0.0.1:12121';
            putPolicy.callbackBody = 'filename=$(fname)&filesize=$(fsize)';
            return putPolicy.token();
        }

        //生成上传 Token
        let token = uptoken(bucket, key);

        //构造上传函数
        function uploadFile(uptoken, key, localFile) {
            var extra = new qiniu.io.PutExtra();
            qiniu.io.putFile(uptoken, key, localFile, extra, function (err, ret) {
                if (!err) {
                    // 上传成功， 处理返回值
                    console.log(ret.hash, ret.key, ret.persistentId);
                } else {
                    // 上传失败， 处理返回代码
                    console.log(err);
                }
            });
        }

        //调用uploadFile上传
        uploadFile(token, key, filePath);
    };
    return qn;
}();