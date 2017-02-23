/**
 * Created by yujintang on 2017/2/23.
 */
'use strict';

module.exports = function () {

    const nodemailer = require('nodemailer');
    const cfg_mail = global.config.mail;
    // const bluebird = require('bluebird');
    // bluebird.promisifyAll(nodemailer);

    let email = {};
    
    /**
     * @param mailOptions 要通知的内容
     * @returns {*}
     */
    email.notice = function (mailOptions) {

        let transporter = nodemailer.createTransport(cfg_mail.notice);
         return transporter.sendMail(mailOptions);
    };

    return email;
}();

