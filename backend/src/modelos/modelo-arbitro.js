//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var ArbitroSchema = new Schema({
  nombre: String,
  tipo: String
});

var arbitroModel = mongoose.model('arbitros', ArbitroSchema);

exports.arbitroModel = arbitroModel;