const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const rutasEquipo = require('./rutas/rutas-equipo');
const rutasJugador = require('./rutas/rutas-jugador');
const rutasPartido = require('./rutas/rutas-partido');
const rutasArbitro = require('./rutas/rutas-arbitro');
const rutasNarrador = require('./rutas/rutas-narrador');

const rutasLogin = require('./rutas/rutas-login');

const app = express();
const port = 3000;

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.use(cors());

rutasEquipo(app);
rutasJugador(app);
rutasPartido(app);
rutasArbitro(app);
rutasNarrador(app);
rutasLogin(app);

app.get('/', function (request, response) {
  response.send('torneo-app-backend');
});

async function main() {
  await mongoose.connect('mongodb+srv://root:1234@cluster0.gsqtf.mongodb.net/torneo');
}

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


app.listen(port, () => {
  console.log(`torneo app listening on port ${port}`);
  main();
})