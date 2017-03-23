/**
 * Created by yujintang on 2017/2/13.
 */
'use strict';

/**
 * 提供各种加解密算法
 */

const uuid = require('uuid'),
    crypto = require('crypto');

module.exports = function () {

    let cj = {};

    cj.UUID = () => {
        return uuid.v4().replace(/[-]/g, '')
    };
    cj.MD5 = text => {
        return crypto.createHash('md5').update(text +='').digest('hex');
    };
    cj.SHA1 = text => {
        return crypto.createHash('sha1').update(text +='').digest('hex');
    };
    cj.SHA256 = text => {
        return crypto.createHash('sha1').update(text +='').digest('hex');
    };
    return cj;
}();