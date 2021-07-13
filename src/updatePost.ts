
/*var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";*/
 
const UpdatePost = MongoClient.connect(url, function(err:any, db:any) {
    if (err) throw err;
    var dbo = db.db("test01");
    var whereStr = {"username":'24klimiantao'};  // 查询条件
    var updateStr = {$set: { "username" : "24k" , "role" : "3" }};
    
    dbo.collection("users").updateOne(whereStr, updateStr, function(err:any, res:any) {
        if (err) throw err;
        console.log("文档修改成功");
        db.close();
    });
});

//export default UpdatePost;
