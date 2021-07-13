//定义路由 就是发送请求打开页面和接收请求返回页面
var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var ListRoles = require('../models/ListRoles');
var Post = require("../post01");
var router = express.Router();

//获取登录后的名字
let login_name = "";
var allRoles : String[] = [];

let RoleNumber : number = 0;
let RoleNumberText = "";

//验证是否登录
const isAuthenticated = (req:any,res:any,next:any) => {
    if(req.user == null){
        res.status(403);
        return res.send("You need to sign in");
    }
    next();
    //return passport.authenticate('local')
}

//验证权限:是管理员还是普通用户  
const validateRole = (req:any,res:any,next:any) => {
    var whereStr = {"username":req.body.username};  // 查询条件
    login_name = req.body.username;

    Account.find(whereStr,function(err:any, result:any) { 
        if (err) throw err;
        //console.log(result);
        RoleNumber = result[0].role;
        console.log(RoleNumber);
    });
    next();  
}

//权限:管理员显示权限列表 
const validateListRole = async (req:any,res:any,next:any) => {
    //login_name = req.body.username;
    console.log(login_name);
    await Account.find({}, function(err:any, result:any) { 
        console.log("刚运行没有进来！！！")
        if (err) throw err;
        console.log("123",RoleNumber);
        //判断登录人的role值
        if(RoleNumber === 2){
            //输出登录人的全部信息
            console.log('kkkk', result.map((item: any) => item.role));
            allRoles = result.map((item: any) => item.role);
            console.log("123",allRoles);
            return allRoles;
        } else {
            allRoles = result.filter((item: any) => item.role === RoleNumber);
            //输出登录人的全部信息
            console.log(allRoles[0]);
            return  RoleNumber;
        }      
    });
    next();  
}
//显示管理员登录后界面
router.get('/admin',validateListRole ,function(req:any,res:any){
    //第一次运行allRoles返回一个[]
    console.log("456",allRoles);
    res.render('admin',{ RoleList : allRoles });
});

router.post('/admin', function(req:any, res:any) {
    
    passport.authenticate('local')(req, res, function () {
        console.log("in");
        res.redirect('/admin');
        console.log("ont");
    });
});








//显示登录页面
router.get('/login', function(req:any, res:any) {
    res.render('login', { user : req.user });
});

router.post('/login', validateRole, function(req:any, res:any) {
    //登陆成功后
    passport.authenticate('local')(req,res,function(){
        console.log(RoleNumber);
        if(RoleNumber === 2){
            res.redirect('/admin');
        }else{
            res.redirect('/user');
        }     
    });
});





//显示普通用户登录后界面
router.get('/user',validateListRole,(req:any,res:any) => {
    if(RoleNumber === 3){
        res.render('user',{text:"普通用户"});
    }
    if(RoleNumber === 4){
        res.render('user',{text:"游客"});
    }
});

router.post('/user',(req:any, res:any) => {

    /*const UpdatePost = MongoClient.connect(url, function(err:any, db:any) {
        if (err) throw err;
        var dbo = db.db("test01");
        var whereStr = { "username" : login_name };  // 查询条件
        var updateStr = {$set: { "username" : req.body.newusername }};
        dbo.collection("users").updateOne(whereStr, updateStr, function(err:any, res:any) {
            if (err) throw err;
            console.log(login_name);
            db.close();
        });
    });*/

    //信息修改成功后
    /*passport.authenticate('local')(req,res,function(){
        res.redirect('/user');     
    });*/
});








router.get('/', function (req:any, res:any) {
    res.render('index', { user : req.user });
});

//显示注册页面
router.get('/register', function(req:any, res:any) {
    res.render('register', { });
});

router.post('/register', function(req:any, res:any) {
    Account.register(new Account({ username : req.body.username }), req.body.password, function(err:any, account:any) {
        if (err) {
            return res.render('register', { account : account });
        }
        //注册成功后
        passport.authenticate('local')(req, res, function () {
            res.redirect('/');
        });
    });
});

//管理员权限：查询所有用户信息
router.get('/selectuser', function(req:any,res:any){
    /*var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";*/

    const GetAllPost = MongoClient.connect(url,function(err:any,db:any){
        if(err) throw err;
        var dbo = db.db("test01");
        dbo.collection("users").find({}).toArray(function(err:any,result:any){
            if(err) throw err;
            //console.log(allUsers == result);
            //console.log(allUsers === result);
            //allUsers = result
            res.render('selectuser',{ result });
            db.close();
        });
    });
    //res.render('selectuser',{ allUsers });
});

router.post('/selectuser', function(req:any, res:any) {
    passport.authenticate('local')(req, res, function () {
        res.redirect('/selectuser');
    });
});

//管理员权限：删除用户
//isAuthenticated(), validateRole([]),
router.get('/deleteuser',function(req:any,res:any){
    res.render('deleteuser',{ user:req.user })
});

router.post('/deleteuser',passport.authenticate('local'), function(req:any, res:any) {
    res.render('deleteuser',{});
});

//普通用户权限：修改自己信息
router.get('/modify_information',function(req:any,res:any){
    res.render('modify_information',{})
});

router.get('/logout', function(req:any, res:any) {
    req.logout();
    res.redirect('/');
});

router.get('/ping', function(req:any, res:any){
    res.status(200).send("pong!");
});

module.exports = router;

function req(req: any, arg1: string): any {
    throw new Error("Function not implemented.");
}
