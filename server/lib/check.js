/**
 * Created by yujintang on 2017/2/27.
 */
'use strict';

/**
 * 提供各种类型的验证
 * @returns {{}}
 */

const _ = require('lodash');

module.exports = function () {

    let ck = {};

    
    /**
     * 必填参数验证
     */
    ck.params = (obj, arr) => {
        let result = _.find(arr, v => {
            return !obj[v]
        });
        if (result != undefined) {
            throw new Error(`缺少参数：${result}`)
        }
    };


    /**
     * 验证邮箱
     */
    ck.email = email => {
        let reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
        if (!reg.test(email)) {
            throw new Error('📮 邮箱格式错误')
        }
    };

    /**
     *验证手机
     */
    ck.phone = phone => {
        let reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
        if(!reg.test(phone)){
            throw new Error('📱 手机格式错误')
        }
    };

    return ck;
}();