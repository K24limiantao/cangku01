var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//passport-local-mongoose包会自动为我们处理salting和hashing密码
var passportLocalMongoose = require('passport-local-mongoose');

var Account = new Schema({
    username : String,
    password : String,
    role : Number
});

Account.plugin(passportLocalMongoose);

//表
module.exports = mongoose.model('user',Account);
