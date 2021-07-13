
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
 
const DeletePost =  MongoClient.connect(url, function(err:any, db:any) {
    if (err) throw err;
    var dbo = db.db("test01");
    var whereStr = {"title" : '20k'};  // 查询条件
    dbo.collection("conn01").deleteOne(whereStr, function(err:any, obj:any) {
        if (err) throw err;
        console.log("文档删除成功");
        db.close();
    });
});

export default DeletePost;
