/**
 * Created by yujintang on 2017/2/13.
 */
'use strict';

module.exports = function () {

    const uuid = require('uuid');
    const cryptoJs = require('crypto-js');

    let cj = {};

    cj.UUID = () => {
        return uuid.v4().replace(/[-]/g, '')
    };
    cj.MD5 = str => {
        return cryptoJs.MD5(str).toString()
    };
    return cj;
}();