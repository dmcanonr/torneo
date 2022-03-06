//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var CambioSchema = new Schema({
    equipo: { type: Schema.Types.ObjectId, ref: 'equipos' },
    jugadorEntra: { type: Schema.Types.ObjectId, ref: 'jugadores' },
    jugadorSale: { type: Schema.Types.ObjectId, ref: 'jugadores' },
    minuto: Number
});

exports.cambioSchema = CambioSchema;