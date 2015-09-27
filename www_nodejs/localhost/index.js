/**
 微信配置
 记得改host
 */

var weixin = {
    token: 'token',
    appid: 'appid',
    appSecret: 'appSecret',
    encodingAESKey: 'encodingAESKey',
    host: 'localhost'
};

/**
 引入功能模块
 */
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var mongoose = require('mongoose');
//微信公共平台自动回复消息接口服务中间件
var wechat = require('wechat');
//微信api
var API = require('wechat-api');

/**
 * 连接Mongodb数据库,可以用来记录微信用户和微信服务器的消息
 */
//mongoose.connect('mongodb://mongodb/wechat');

var app = express();

/**
 * 设置模板引擎为ejs
 */
app.set('view engine', 'ejs');

/**
 * 处理静态文件
 */
app.use('/public', express.static(__dirname + '/public'));


/**
 * express session功能
 */
app.use(expressSession({
    secret: 'keyboard cat',
    cookie: {maxAge: 60000},
    resave: true,
    saveUninitialized: true
}));


/**
 * 初始化微信api
 */
var api = new API(weixin.appid, weixin.appSecret);

/**
 首页
 */
app.get('/', function (req, res) {
    res.end('Hello, World!');
});

/**
 * 热部署本文件时需要提前关闭数据库
 */
app.onClearCache = function () {
    console.log('onClearCache');
    mongoose.disconnect();
};

/**
 * !!!  http://域名/weixin 集成微信开发者中心的服务器认证功能  !!!
 *
 * 微信自动回复消息中间件
 */
app.use('/weixin', wechat(weixin, function (req, res, next) {
    // 微信输入信息都在req.weixin上
    var message = req.weixin;
    if (message.Content === '屌丝') {
        // 回复屌丝(普通回复)
        res.reply('呵呵');
        return;
        // 你也可以这样回复text类型的信息
        res.reply({
            content: 'text object',
            type: 'text'
        });
    } else if (message.Content === '呵呵') {
        // 回复一段音乐
        res.reply({
            type: "music",
            content: {
                title: "来段音乐吧",
                description: "一无所有",
                musicUrl: "http://"+weixin.host+"/public/music/1.mp3",
                hqMusicUrl: "http://"+weixin.host+"/public/music/1.mp3",
                //缩略图的媒体id，通过素材管理接口上传多媒体文件，得到的id
                //详情 http://mp.weixin.qq.com/wiki/14/89b871b5466b19b3efa4ada8e577d45e.html#.E5.9B.9E.E5.A4.8D.E9.9F.B3.E4.B9.90.E6.B6.88.E6.81.AF
                thumbMediaId: "thisThumbMediaId"
            }
        });
    } else {
        // 图文并带网页链接回复，用户可通过微信浏览器打开网址
        // 可以分享成为微信朋友圈消息
        res.reply([
            {
                title: '目标链接的标题',
                description: '目标链接的内容描述',
                picurl: 'http://'+weixin.host+'/public/img/1.jpg',
                url: 'http://'+weixin.host+'/article/'
            }
        ]);
    }
}));


/**
 * 微信朋友圈网页服务,亲测与微信客户端配对成功
 */
app.get('/article', function (req, res) {
    var param = {
        debug: true,
        jsApiList: ['getNetworkType'],
        url: 'http://'+weixin.host+'/article/'
    };
    api.getJsConfig(param, function (err, result) {
        //克隆结果对象
        result = JSON.parse(JSON.stringify(result));
        //修改debug名称，因为debug=true是开启ejs模板引擎的开发模式
        result._debug = result.debug;
        delete result.debug;
        //修改结果对象的jsApi，在模板引擎还原为数组格式
        result.jsApiList = JSON.stringify(result.jsApiList);
        res.render('articles/index.ejs', result);
    });
});

module.exports = app;