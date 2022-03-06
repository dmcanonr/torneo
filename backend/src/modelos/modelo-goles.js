//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var GolSchema = new Schema({
    equipo: { type: Schema.Types.ObjectId, ref: 'equipos' },
    jugador: { type: Schema.Types.ObjectId, ref: 'jugadores' },
    minuto: Number
});

exports.golSchema = GolSchema;