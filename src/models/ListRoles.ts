var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//passport-local-mongoose包会自动为我们处理salting和hashing密码
var passportLocalMongoose = require('passport-local-mongoose');

var listroles = new Schema({
    id : Number,
    role : String
});

listroles.plugin(passportLocalMongoose);

//表
module.exports = mongoose.model('role',listroles);