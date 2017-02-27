/**
 * Created by yujintang on 2017/2/23.
 */
'use strict';

/**
 * 邮件发送方法
 */
const nodemailer = require('nodemailer');
const cfg_mail = global.config.mail;

module.exports = function () {

    let email = {};

    /**
     * @param mailOptions 要通知的内容
     * @returns {*}
     */
    email.notice = async function (opt) {

        let {email, name, content} = opt;
        let transporter = nodemailer.createTransport(cfg_mail.notice);
        let model = {
            from: cfg_mail.notice.auth.user,
            to: email,
            subject: '[放心猿]有新的通知',
            html: `<div style="background: rgba(156, 175, 235, 0.51)">
                    <hr />
                    <p style="text-align:center;">[放心猿]的信</p >
                    <hr />
                    <p>dear ${name}:</p >
                    <p style="text-indent: 2em">感谢您的来信，我们会尽快联系您！</p>
                    <hr />
                    <P> 原文：${content}</P>
                    <hr />
                </div>`
        };
        return transporter.sendMail(model);
    };


    return email;
}();

