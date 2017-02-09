/**
 * 开发者：yujintang
 * 开发时间: 2017/2/4
 */

const start_time = new Date();

const Koa = require('koa');
const session = require('koa-session-minimal');
const bodyParser = require('koa-bodyparser');
const Router = require('koa-router');
const logger = require('koa-logger');

const app = new Koa();
const router = new Router();

var config = require('./config');
var log = require('./init/log4js');
var mongo = require('./init/mongoose');
var redis = require('./init/redis');
var Result = require('./lib/result');
var cfg_sys = config.system;
var opt_rds = require('./init/session_rds').opt_rds;
var index = require('./routes/index');
var user = require('./routes/user');

// response
app.keys = [cfg_sys.cookieKey];
app.use(session(opt_rds));
app.use(bodyParser());
process.env.NODE_ENV !== 'real' && app.use(logger());



router.get('/', index.routes(), index.allowedMethods());
router.use('/user', user.routes(), user.allowedMethods());
app.use(router.routes());

app.listen(cfg_sys.port);
log.system.info(((ms) => `Server startup in ${ms} ms, Address: http://localhost:${cfg_sys.port}`)(Date.now() - start_time));

//bind exception event to log
process.on('uncaughtException', function(e){
    log.system.error('uncaughtException from process', e);
    process.exit(1);
});

process.on('unhandledRejection', (e) => {
    log.system.warn('unhandledRejection from process', e);
    process.exit(1);
});

process.on('rejectionHandled', (e) => {
    log.system.warn('rejectionHandled from process', e);
    process.exit(1);
});

module.exports = app;

