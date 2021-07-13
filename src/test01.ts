const c = require('./getPost');
console.log(c.RoleNumber);

//权限:管理员显示权限列表 
/* const validateListRole = (req:any,res:any,next:any) => {

    ListRoles.find({}, function(err:any, result:any) { 
        if (err) throw err;
        console.log('req------------>', req.body);*/
        /* for(var i=0;i<result.length;i++){
            console.log(result[i].role);
            allRoles[i] = result[i].role;
        } */
        /*if(req.user.role === "2"){
            return  result.map((item: any) => item.role)
        } else {
            return  result.filter((item: any) => item.role === req.user.role)
        }
            
        console.log(result.map((item: any) => item.role));*/
        /*RoleNumber = result[0].role;
        console.log(RoleNumber);*/
    /*});
    next();  
} */

//权限:普通用户登陆后显示自己属于什么角色 
/* const validateUserRole = (req:any,res:any,next:any) => {
    var whereStr = {"username":login_name};  // 查询条件
    console.log(login_name);
    Account.find(whereStr,function(err:any, result:any) { 
        if (err) throw err;
        console.log(result);
        RoleNumber = result[0].role;
        console.log(RoleNumber);
    });
    if(RoleNumber == '3'){
        res.render('user',{text:"普通用户"});
    }
    if(RoleNumber == '4'){
        res.render('user',{text:"游客"});
    }
    next();  
} */