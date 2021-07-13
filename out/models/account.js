"use strict";
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//passport-local-mongoose包会自动为我们处理salting和hashing密码
var passportLocalMongoose = require('passport-local-mongoose');
var Account = new Schema({
    username: String,
    password: String
});
Account.plugin(passportLocalMongoose);
module.exports = mongoose.model('Account', Account);
