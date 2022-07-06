// Librerias necesarias
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { conexionDB } = require('./config/mysql');

// Constantes necesarias
const app = express();
const port = process.env.PORT || 3001;

//middlewares
app.use(cors());

//rutas
app.use('/api', require('./routes'));

app.listen(port, () => (
    console.log(`La app esta lista en http://localhost:${port}`)
));

conexionDB();