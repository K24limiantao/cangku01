"use strict";
var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/";
var GetAllPost = MongoClient.connect(url, function (err, db) {
    if (err)
        throw err;
    var dbo = db.db("test01");
    dbo.collection("admin").find({}).toArray(function (err, result) {
        if (err)
            throw err;
        console.log(result);
        db.close();
    });
});
