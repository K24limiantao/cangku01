/*var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/";*/

const GetAllPost = MongoClient.connect(url,function(err:any,db:any){
    if(err) throw err;
    var dbo = db.db("test01");
    dbo.collection("users").find({}).toArray(function(err:any,result:any){
        if(err) throw err;
        console.log(allUsers == result);
        console.log(allUsers === result);
        //allUsers = result
        //res.render('selectuser',{ result });
        db.close();
    });
});

/*function getallpost(res:any){
    const GetAllPost = MongoClient.connect(url,function(err:any,db:any){
        if(err) throw err;
        let dbo = db.db("test01");
        dbo.collection("users").find({}).toArray(function(err:any,result:any){
            if(err) throw err;
            res.render('selectuser',{ result })
        });
    });
}*/