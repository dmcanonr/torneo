//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var JugadorSchema = new Schema({
  nombre: String,
  posicion: String,
  camiseta: Number,
  equipo: { type: Schema.Types.ObjectId, ref: 'equipos' },
});

var JugadorModel = mongoose.model('jugadores', JugadorSchema);

exports.jugadorModel = JugadorModel;