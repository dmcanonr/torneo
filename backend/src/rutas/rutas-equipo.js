const equipoModel = require('../modelos/modelo-equipo');

module.exports = function (app) {
    app.post('/equipo', async function (request, response) {
        try {
            let equipo = null;
            if (request.body._id) {
                equipo = await equipoModel.equipoModel.findById(request.body._id);
                equipo.nombre = request.body.nombre;
                equipo.color = request.body.color;
                equipo.tecnico = request.body.tecnico;
            } else {
                equipo = new equipoModel.equipoModel(request.body);
            }
            await equipo.save();
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

    app.get('/equipos/listar', async function (request, response) {
        try {
            let equipos = await equipoModel.equipoModel.find({}, ['nombre', 'color', 'tecnico']);
            console.log('equipos', equipos);
            response.send(equipos);
        } catch (err) {
            console.log('hubo un error', err);
            response.status(500).send({
                error: 'Error de BD'
            });
        }
    });

    app.get('/equipo/:id', async function (request, response) {
        console.log('id a buscar', request.params.id);
        try {
            let equipo = await equipoModel.equipoModel.findById(request.params.id).populate('jugadores', '_id nombre posicion camiseta').exec();
            console.log('equipo encontrado', equipo);
            response.send(equipo);
        } catch (err) {
            console.log('error obteniendo equipo', err);
            response.status(500).send({
                error: 'Error de BD'
            });
        }
    });

    app.delete('/equipo/:id', async function (request, response) {
        try {
            await equipoModel.equipoModel.findByIdAndRemove(request.params.id);
            // TODO: borrar los jugadores del equipo, borrar los partidos de ese
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