/**
    微信配置
*/

var weixin = {
    token: '159357',
    appID: 'wxe94e7aaaabaf7a57',
    appSecret: '780f119408b069f05d4d5eab0599a967',
    encodingAESKey: '950EjhOFovzbTNRHZbcHpqNEuqL8nBmiSqnd5bhbOeT'
};

/**
    引入功能模块
*/
var express = require('express');        
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var fs = require('fs');
var xmlparser = require('express-xml-bodyparser');
//微信api
var API = require('wechat-api');
//采集用
var request = require('request');

/**
    连接Mongodb数据库
*/
mongoose.connect('mongodb://mongodb/wechat');

/**
    初始化微信api
*/
var api = new API(weixin.appID, weixin.appSecret);

/**
    首页
*/
app.get('/', function (req, res) {
    res.end('Hello, World!');
});

/**
    热部署本文件时需要提前关闭数据库
*/
app.onClearCache = function () {
    console.log('onClearCache');
    mongoose.disconnect();
};

/**
    微信开发者服务器认证
*/
app.get('/wx_server_ouath',xmlparser(), function (req, res) {    
    var crypto = require("crypto");    
    var md5sum = crypto.createHash("sha1");

    var signature = req.query.signature;
    var echostr = req.query.echostr;
    var timestamp = req.query.timestamp;
    var nonce = req.query.nonce;
    var oriArray = [nonce, timestamp, weixin.token];
    oriArray.sort();
    var original = oriArray.join('');

    md5sum.update(original);
    var scyptoString = md5sum.digest("hex");

    console.log("signature:%s,scyptoString:%s", signature, scyptoString);
    if (signature == scyptoString) {
        res.end(echostr);
        console.log("Confirm and send echo back");
    } else {
        res.end("false");
        console.log("Failed!");
    }
});

module.exports = app;
