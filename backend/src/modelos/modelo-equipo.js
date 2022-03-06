//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var EquipoSchema = new Schema({
  nombre: String,
  color: String,
  tecnico: String,
  jugadores: [{ type: Schema.Types.ObjectId, ref: 'jugadores' }]
});

var EquipoModel = mongoose.model('equipos', EquipoSchema );
exports.equipoModel = EquipoModel;