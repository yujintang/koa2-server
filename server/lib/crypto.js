/**
 * Created by yujintang on 2017/2/13.
 */
'use strict';
 
module.exports = function () {
    
    const uuid = require('uuid');
    
    let cj = {};
    
    cj.UUID = function () {
        return uuid.v4().replace(/[-]/g, '');
    }
    return cj;
}();

