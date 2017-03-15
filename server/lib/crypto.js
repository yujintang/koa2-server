/**
 * Created by yujintang on 2017/2/13.
 */
'use strict';

/**
 * 提供各种加解密算法
 */

const uuid = require('uuid');
const cryptoJs = require('crypto-js');

module.exports = function () {

    let cj = {};

    cj.UUID = () => {
        return uuid.v4().replace(/[-]/g, '')
    };
    cj.MD5 = str => {
        return cryptoJs.MD5(str).toString()
    };
    cj.SHA1 = function (text) {
        return CryptoJS.SHA1(text).toString();
    };
    return cj;
}();