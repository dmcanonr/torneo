const narradorModel = require('../modelos/modelo-narrador');

module.exports = function (app) {
    app.post('/narrador', async function (request, response) {
        try {
            let arbitro = null;
            if (request.body._id) {
                arbitro = await narradorModel.narradorModel.findById(request.body._id);
                arbitro.nombre = request.body.nombre;
            } else {
                arbitro = new narradorModel.narradorModel(request.body);
            }
            await arbitro.save();
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

    app.get('/narrador/listar', async function (request, response) {
        try {
            let narradores = await narradorModel.narradorModel.find({});
            console.log('Narrador', narradores);
            response.send(narradores);
        } catch (err) {
            console.log('Hubo un error', err);
            response.status(500).send({
                error: 'Error de BD'
            });
        }
    });

    app.get('/narrador/:id', async function (request, response) {
        console.log('id a buscar', request.params.id);
        try {
            let narrador = await narradorModel.narradorModel.findById(request.params.id).exec();
            console.log('narrador encontrado', narrador);
            response.send(narrador);
        } catch (err) {
            console.log('error obteniendo narrador', err);
            response.status(500).send({
                error: 'Error de BD'
            });
        }
    });

    app.delete('/narrador/:id', async function (request, response) {
        try {
            await narradorModel.narradorModel.findByIdAndRemove(request.params.id);
            response.send({
                status: 'OK',
                message: 'success'
            });
        } catch (err) {
            console.log('error borrando narrador', err);
            response.status(500).send({
                error: 'Error de BD'
            });
        }
    });

}