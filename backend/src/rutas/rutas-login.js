const loginModel = require('../modelos/modelo-login');
module.exports = function (app) {
    app.post('/login', async function (request, response) {
        try {
            var usuarios = await loginModel.loginModel.find({ usuario: request.body.usuario, password: request.body.password });
            console.log('usuarios', usuarios);
            if (usuarios.length > 0) {
                response.send({
                    status: 'OK',
                    message: 'success'
                });
            } else {
                console.log('No se encontro el usuario');
                response.status(500).send({
                    error: 'Error de usuario y/o contraseña'
                })
            }
        } catch (error) {
            console.log('Hubo un error', error);
            response.status(500).send({
                error: 'Error de BD'
            });
        }
    });
}