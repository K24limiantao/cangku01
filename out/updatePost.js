"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var UpdatePost = MongoClient.connect(url, function (err, db) {
    if (err)
        throw err;
    var dbo = db.db("test01");
    var whereStr = { "name": 'jiayou' }; // 查询条件
    var updateStr = { $set: { "title": "20k" } };
    dbo.collection("conn01").updateOne(whereStr, updateStr, function (err, res) {
        if (err)
            throw err;
        console.log("文档修改成功");
        db.close();
    });
});
exports.default = UpdatePost;
