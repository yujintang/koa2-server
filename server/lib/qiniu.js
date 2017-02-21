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
    const bluebird = require('bluebird');
    bluebird.promisifyAll(qiniu.io);

    let qn = {};

    /**
     * key: 上传到七牛上的文件名，
     * filePath: 要上传的本地路径,
     * type: 图片处理类型
     */
    qn.upload = async function (key, filePath, type) {

        //构建上传策略函数，设置回调的url以及需要回调给业务服务器的数据
        function uptoken(bucket, key) {
            var putPolicy = new qiniu.rs.PutPolicy(bucket + ":" + key);

            let fops = void 0;
            switch (type){
                case 'avatar':
                    fops = cfg_qiniu.avatar_style;
                    break;
                default:
                    fops = '';
                    break;
            }
            let saveas_key = qiniu.util.urlsafeBase64Encode(bucket+':'+key);
            fops = fops+'|saveas/'+saveas_key;
            putPolicy.persistentOps = fops;
            return putPolicy.token();
        }

        //生成上传 Token
        let token = uptoken(bucket, key);
        var extra = new qiniu.io.PutExtra();
        return qiniu.io.putFileAsync(token, key, filePath, extra);
    };
    return qn;
}();