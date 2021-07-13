
/*var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";*/
//var RoleNumber = "";
 
GetPost = MongoClient.connect(url, function(err:any, db:any) {

    if (err) throw err;
    var dbo = db.db("test01");
    var whereStr = {"username":"24k"};  // 查询条件

    console.log(typeof whereStr);

    dbo.collection("users").find(whereStr).toArray(function(err:any, result:any) {
        if (err) throw err;
        //console.log(result);
        console.log(result[0].password);
        //RoleNumber = result[0].role;
        //console.log(RoleNumber);
        db.close();
    });
});



