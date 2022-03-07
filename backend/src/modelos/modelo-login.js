//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var LoginSchema = new Schema({
    usuario: String,
    password: String
});

var loginModel = mongoose.model('login', LoginSchema);

exports.loginModel = loginModel;