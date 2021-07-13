"use strict";
/*const express = require('express');
const routes = require('./server');
const app = express();*/
var bodyParser = require('body-parser');
var session = require('express-session');
// 创建 application/x-www-form-urlencoded 编码解析
//const urlencodeParser = bodyParser.urlencodeParser({extends:false})
/* module.exports = function(app:any){
    // 设置页面的跳转还有session的设置
    app.use(session({secret:'keyboard cat',cookie:{maxAge:60000}}));
    app.use('/',routes);
    app.use('/regist',routes);
    app.use('/logout',routes);
    app.use('/info',routes);
    app.use('/check', routes);
    app.use(express.static(__dirname + '/public'));
} */ 
