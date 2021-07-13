"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var GetPost = MongoClient.connect(url, function (err, db) {
    var str = process.argv[2];
    var strsplit = str.split(":");
    if (err)
        throw err;
    var dbo = db.db("test01");
    var whereStr = { "title": "24k" }; // 查询条件
    console.log(typeof whereStr);
    dbo.collection("conn01").find(whereStr).toArray(function (err, result) {
        if (err)
            throw err;
        console.log(result);
        db.close();
    });
});
exports.default = GetPost;
