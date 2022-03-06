const partidoModel = require('../modelos/modelo-partido');

module.exports = function (app) {
    app.get('/partidos/listar', async function (request, response) {
        try {
            let equipos = await partidoModel.partidoModel.find({}, ['equipoLocal', 'equipoVisitante']).populate('equipoLocal', 'nombre').populate('equipoVisitante', 'nombre');
            console.log('partidos', equipos);
            response.send(equipos);
        } catch (err) {
            console.log('hubo un error', err);
            response.status(500).send({
                error: 'Error de BD'
            });
        }
    });

    app.post('/partido', async function (request, response) {
        try {
            let partido = null;
            if (request.body._id) { //se está editando un partido
                partido = await partidoModel.partidoModel.findById(request.body._id);
                partido.equipoLocal = request.body.equipoLocal;
                partido.equipoVisitante = request.body.equipoVisitante;
                partido.colorLocal = request.body.colorLocal;
                partido.colorVisitante = request.body.colorVisitante;
                partido.narrador = request.body.narrador;
                partido.arbitroLinea1 = request.body.arbitroLinea1;
                partido.arbitroLinea2 = request.body.arbitroLinea2;
                partido.arbitroCentral = request.body.arbitroCentral;
            } else {//se está creando un partido
                partido = new partidoModel.partidoModel(request.body);
            }
            
            await partido.save();
            console.log('partido guardado');
            response.send({
                status: 'OK',
                message: 'success'
            });
        } catch (err) {
            console.log('hubo un error', err);
            response.status(500).send({
                error: 'Error de BD'
            });
        }
    });

    app.get('/partido/:id', async function (request, response) {
        console.log('id a buscar', request.params.id);
        try {
            let partido = await partidoModel.partidoModel.findById(request.params.id).exec();
            console.log('partido encontrado', partido);
            response.send(partido);
        } catch (err) {
            console.log('error obteniendo partido', err);
            response.status(500).send({
                error: 'Error de BD'
            });
        }
    });

    app.get('/partido/detalles/:id', async function (request, response) {
        console.log('id a buscar', request.params.id);
        try {
            let partido = await partidoModel.partidoModel.findById(request.params.id)
                .populate('arbitroLinea1', 'nombre')
                .populate('arbitroLinea2', 'nombre')
                .populate('arbitroCentral', 'nombre')
                .populate('equipoLocal', 'nombre')
                .populate('equipoVisitante', 'nombre')
                .populate('jugadorDestacado', 'nombre camiseta')
                .populate({
                    path: 'goles',
                    select: 'camiseta jugador equipo',
                    populate: {
                        path: 'jugador',
                        select: 'nombre camiseta'
                    }
                })
                .populate({
                    path: 'goles',
                    select: 'camiseta jugador equipo',
                    populate: {
                        path: 'equipo',
                        select: 'nombre'
                    }
                })
                .populate({
                    path: 'tarjetas',
                    select: 'camiseta jugador equipo tipo',
                    populate: {
                        path: 'jugador',
                        select: 'nombre camiseta'
                    }
                })
                .populate({
                    path: 'tarjetas',
                    select: 'camiseta jugador equipo tipo',
                    populate: {
                        path: 'equipo',
                        select: 'nombre'
                    }
                })
                .populate({
                    path: 'cambios',
                    select: 'equipo jugadorEntra jugadorSale minuto',
                    populate: {
                        path: 'equipo',
                        select: 'nombre'
                    }
                })
                .populate({
                    path: 'cambios',
                    select: 'equipo jugadorEntra jugadorSale minuto',
                    populate: {
                        path: 'jugadorEntra',
                        select: 'nombre camiseta'
                    }
                })
                .populate({
                    path: 'cambios',
                    select: 'equipo jugadorEntra jugadorSale minuto',
                    populate: {
                        path: 'jugadorSale',
                        select: 'nombre camiseta'
                    }
                })
                .exec();
            console.log('partido encontrado', partido);
            response.send(partido);
        } catch (err) {
            console.log('error obteniendo partido', err);
            response.status(500).send({
                error: 'Error de BD'
            });
        }
    });

    app.post('/partido/:id/jugador-destacado', async function (request, response) {
        try {
            await partidoModel.partidoModel.findByIdAndUpdate(
                request.params.id,
                {
                    jugadorDestacado: request.body.jugador
                }
            ).exec();
            response.send({
                status: 'OK',
                message: 'success'
            });
        } catch (err) {
            console.log('hubo un error', err);
            response.status(500).send({
                error: 'Error de BD'
            });
        }
    });

    app.post('/partido/:id/agregar-tarjeta', async function (request, response) {
        try {
            let partidoActualizado = await partidoModel.partidoModel.findByIdAndUpdate(request.params.id, {
                $push: {
                    'tarjetas': request.body
                }
            }).exec();
            console.log('tarjeta actualizada?', partidoActualizado);
            response.send({
                status: 'OK',
                message: 'success'
            });
        } catch (err) {
            console.log('hubo un error', err);
            response.status(500).send({
                error: 'Error de BD'
            });
        }
    });

    app.get('/partido/:id/equipos-gol', async function (request, response ) {
        console.log('id a buscar', request.params.id);
        try {
            let partido = await partidoModel.partidoModel.findById(request.params.id, '_id equipoLocal, equipoVisitante')
                .populate({
                    path: 'equipoLocal',
                    select: 'nombre',
                    populate: {
                        path: 'jugadores',
                        select: 'nombre camiseta',
                    }
                })
                .populate({
                    path: 'equipoVisitante',
                    select: 'nombre',
                    populate: {
                        path: 'jugadores',
                        select: 'nombre camiseta',
                    }
                })
                .exec();
            console.log('partido encontrado', partido);
            response.send(partido);
        } catch (err) {
            console.log('error obteniendo partido', err);
            response.status(500).send({
                error: 'Error de BD'
            });
        }
    });

    app.post('/partido/:id/agregar-gol', async function (request, response) {
        try {
            let partidoActualizado = await partidoModel.partidoModel.findByIdAndUpdate(request.params.id, {
                $push: {
                    'goles': request.body
                }
            }).exec();
            console.log('gol actualizado', partidoActualizado);
            response.send({
                status: 'OK',
                message: 'success'
            });
        } catch (err) {
            console.log('hubo un error', err);
            response.status(500).send({
                error: 'Error de BD'
            });
        }
    });

    app.post('/partido/:id/agregar-cambio', async function(request, response) {
        try {
            let partidoActualizado = await partidoModel.partidoModel.findByIdAndUpdate(request.params.id, {
                $push: {
                    'cambios': request.body
                }
            }).exec();
            console.log('cambio agregado', partidoActualizado);
            response.send({
                status: 'OK',
                message: 'success'
            });
        } catch (err) {
            console.log('hubo un error', err);
            response.status(500).send({
                error: 'Error de BD'
            });
        }
    });
}