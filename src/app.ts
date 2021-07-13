//import express from "express";
var routes = require('./routes/index');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var table = require('./models/account')
var LocalStrategy = require('passport-local').Strategy;

const connectRoles = require('connect-roles');

const app = express();
const port = 8080;

app.listen(port, () => {
	console.log(`服务器http://localhost:${port}正在启动中！`)
});

//连接数据库和表
let MongoClient = require('mongodb').MongoClient;
let url = "mongodb://localhost:27017/test01";
let GetPost = mongoose.connect(url,{useNewUrlParser:true},function(err:any, db:any) {    
    if(err) throw err;
    console.log("数据库连接成功！！！");
});


// 查看引擎设置
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

/*const users = new connectRoles({
    //当用户授权失败时采用（req，res）函数
    failureHandler : function (req:any,res:any,action:any){
        // 可选函数来自定义运行时运行的代码
        // 用户未授权
        // 这个“Accept” 头属性能被浏览器用来指定响应的media 类型，表示自己可以接受的类型
        const accept = req.headers.accept || '';
        res.status(403);
        if(~accept.indexOf('html')){
            res.render('user',{action:action});
        }else{
            res.send('访问被拒绝，你没有权限: ' + action);
        }
    }
});*/

// 管理员可以访问所有页面
/*users.use(function(req:any){
    if(req.users.role === 'admin'){
        return true;
    }
});*/

// 定义路由
// app.use(authentication);
// app.use(users.middleware());

// 匿名用户只能访问主页
// 返回错误会阻止更多的规则存在
// 考虑
/*users.use(function (req:any,action:any){
    if(!req.isAuthenticated()){
        return action === 'access home page';
    }
});

// 版主用户可以访问私有页面
// 但是它们可能是不是唯一的，所以如果用户不是版主，我们就不会返回false
users.use('access private page',function(req:any){
    if(req.users.role === 'moderator'){
        return true;
    }
});

*/

/*app.get('/',users.can('access home page'),function(req:any,res:any){
    res.render('private');
});*/
/*app.get('/private',users.can('access private page'),function(req:any,res:any){
    res.render('private');
});*/
/*app.get('/admin',users.can('access admin page'),function(req:any,res:any){
    res.render('admin');
});*/












// uncomment after placing your favicon in /public
// app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', routes);

// passport 配置
var Account = require('./models/account');
passport.use(new LocalStrategy(Account.authenticate()));
//序列化函数
passport.serializeUser(Account.serializeUser());
//反序列化函数
passport.deserializeUser(Account.deserializeUser());

// mongoose
//数据库test01
mongoose.connect('mongodb://localhost/test01');

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err:any, req:any, res:any, next:any) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err:any ,req:any, res:any, next:any) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;