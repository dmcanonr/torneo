const jugadorModel = require('../modelos/modelo-jugador');
const equipoModel = require('../modelos/modelo-equipo');

module.exports = function (app) {
    app.post('/jugador', async function (request, response) {
        try {
            let jugador = null;
            if (request.body._id) { //se está editando un jugador
                jugador = await jugadorModel.jugadorModel.findById(request.body._id);
                jugador.nombre = request.body.nombre;
                jugador.camiseta = request.body.camiseta;
                jugador.posicion = request.body.posicion;
            } else { //se está creando un jugador
                jugador = new jugadorModel.jugadorModel(request.body);
            }
            await jugador.save();
            await equipoModel.equipoModel.findByIdAndUpdate(request.body.equipo, {
                $push: {
                    'jugadores': jugador._id
                }
            }).exec();

            response.send({
                status: 'OK',
                message: 'success'
            });
        } catch (err) {
            console.log('hubo un error al crear el jugador', err);
            response.status(500).send({
                error: 'Error de BD'
            });
        }
    });

    app.get('/jugadores/listar', async function (request, response) {
        try {
            let jugadores = await jugadorModel.jugadorModel.find({}, ['nombre', 'camiseta', 'posicion']).populate('equipo', '_id nombre').exec();
            console.log('jugadores', jugadores);
            response.send(jugadores);
        } catch (err) {
            console.log('hubo un error listando los jugadores', err);
            response.status(500).send({
                error: 'Error de BD'
            });
        }
    });

    app.get('/jugador/:id', async function (request, response) {
        console.log('id a buscar', request.params.id);
        try {
            let jugador = await jugadorModel.jugadorModel.findById(request.params.id).populate('equipo', '_id nombre').exec();
            console.log('jugador encontrado', jugador);
            response.send(jugador);
        } catch (err) {
            console.log('error obteniendo jugador', err);
            response.status(500).send({
                error: 'Error de BD'
            });
        }
    });

    app.delete('/jugador/:id', async function (request, response) {
        try {
            await jugadorModel.jugadorModel.findByIdAndRemove(request.params.id);
            // TODO: borrar los goles, tarjetas y destacados
            response.send({
                status: 'OK',
                message: 'success'
            });
        } catch (err) {
            console.log('error borrando equipo', err);
            response.status(500).send({
                error: 'Error de BD'
            });
        }
    });
}