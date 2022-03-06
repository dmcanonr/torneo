//Require Mongoose
var mongoose = require('mongoose');
var cambioSchema = require('./modelo-cambios');
var golSchema = require('./modelo-goles');
var tarjetaSchema = require('./modelo-tarjetas');

//Define a schema
var Schema = mongoose.Schema;

var PartidoSchema = new Schema({
    equipoLocal: { type: Schema.Types.ObjectId, ref: 'equipos' },
    equipoVisitante: { type: Schema.Types.ObjectId, ref: 'equipos' },
    colorLocal: String,
    colorVisitante: String,
    jugadorDestacado: { type: Schema.Types.ObjectId, ref: 'jugadores' },
    narrador: { type: Schema.Types.ObjectId, ref: 'narradores' },
    penales: Boolean,
    tiempoExtra: Boolean,
    arbitroLinea1: { type: Schema.Types.ObjectId, ref: 'arbitros' },
    arbitroLinea2: { type: Schema.Types.ObjectId, ref: 'arbitros' },
    arbitroCentral: { type: Schema.Types.ObjectId, ref: 'arbitros' },
    cambios: [cambioSchema.cambioSchema],
    goles: [golSchema.golSchema],
    tarjetas: [tarjetaSchema.tarjetaSchema]
});

var PartidoModel = mongoose.model('partidos', PartidoSchema);
exports.partidoModel = PartidoModel;