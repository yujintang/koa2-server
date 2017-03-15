## 本脚手架 使用koa@2 redis mongodb 完成

* redis 做session存储

* mongodb 做数据库

* log4js 做日志
 z
* 使用es7 async/await 语法

* github, qq, weixin 等第三方接入

* 七牛 云存储
 
* 里面包含常用资源上传，定时器，邮件发送等常用方法


如有任何问题请联系：shanquan54@163.com

#### 文件目录结构

```
├── bin
│   ├── index.js
│   └── pm2.json
├── https
│   ├── certificate.pem
│   ├── certrequest.csr
│   └── privatekey.pem
├── server
│   ├── controller
│   │   ├── auth.js
│   │   ├── email.js
│   │   ├── upload.js
│   │   └── wx.js
│   ├── init
│   │   ├── formidable.js
│   │   ├── log4js.js
│   │   ├── mongoose.js
│   │   ├── redis.js
│   │   └── session_rds.js
│   ├── lib
│   │   ├── check.js
│   │   ├── crypto.js
│   │   ├── email.js
│   │   └── qiniu.js
│   ├── middlewares
│   │   ├── auth_check.js
│   │   ├── ctx_body.js
│   │   └── obj_add.js
│   ├── model
│   │   ├── child
│   │   │   └── file.js 
│   │   └── index.js
│   ├── routers
│   │   ├── api.js
│   │   ├── auth.js
│   │   └── index.js
│   ├── app.js
│   └── config.js
├── README.md
└── package.json
```