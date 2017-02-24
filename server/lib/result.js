/**
 * Created by yujintang on 2017/2/8.
 */

const _ = require('lodash');


var enums = {
    ERROR: 'ERROR', //操作失败
    OK: 'OK' //操作成功
};

var Result = function (ret, err, content) {
    let base = {
        ret: undefined,
        err: err,
        content: content
    };

    (ret && Result[ret]) && (base.ret = Result[ret]);

    return base;
};

_.merge(Result, enums);

global.Result = Result;
module.exports = Result;