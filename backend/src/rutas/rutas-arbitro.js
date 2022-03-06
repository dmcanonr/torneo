const arbitroModel = require('../modelos/modelo-arbitro');

module.exports = function (app) {
    app.post('/arbitro', async function (request, response) {
        try {
            let arbitro = null;
            if (request.body._id) {
                arbitro = await arbitroModel.arbitroModel.findById(request.body._id);
                arbitro.nombre = request.body.nombre;
            } else {
                arbitro = new arbitroModel.arbitroModel(request.body);
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

    app.get('/arbitros/listar', async function (request, response) {
        try {
            let arbitros = await arbitroModel.arbitroModel.find({});
            console.log('arbitros', arbitros);
            response.send(arbitros);
        } catch (err) {
            console.log('hubo un error', err);
            response.status(500).send({
                error: 'Error de BD'
            });
        }
    });

    app.get('/arbitro/:id', async function (request, response) {
        console.log('id a buscar', request.params.id);
        try {
            let arbitro = await arbitroModel.arbitroModel.findById(request.params.id).exec();
            console.log('arbitro encontrado', arbitro);
            response.send(arbitro);
        } catch (err) {
            console.log('error obteniendo arbitro', err);
            response.status(500).send({
                error: 'Error de BD'
            });
        }
    });

    app.delete('/arbitro/:id', async function (request, response) {
        try {
            await arbitroModel.arbitroModel.findByIdAndRemove(request.params.id);
            response.send({
                status: 'OK',
                message: 'success'
            });
        } catch (err) {
            console.log('error borrando arbitro', err);
            response.status(500).send({
                error: 'Error de BD'
            });
        }
    });

}