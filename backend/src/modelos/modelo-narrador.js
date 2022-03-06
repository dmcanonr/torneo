//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var NarradorSchema = new Schema({
  nombre: String
});

var arbitroModel = mongoose.model('narradores', NarradorSchema);

exports.narradorModel = arbitroModel;