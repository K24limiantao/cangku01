
/* var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
 
const CreatePost =  MongoClient.connect(url, function(err:any, db:any) {
    if (err) throw err;
    var dbo = db.db("test01");
    var myobj = { title: "21k", pass: "139239qwe",name:"jiayou" };
    dbo.collection("conn01").insertOne(myobj, function(err:any, res:any) {
        if (err) throw err;
        console.log("文档插入成功");
        db.close();
    });
});

export default CreatePost;
 */