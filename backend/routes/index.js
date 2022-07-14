// importacion de librerias necesarias.
const express = require('express');
const fs = require('fs');
const router = express.Router();

// obteniendo la ruta actual
const PATH_ROUTES = __dirname;

// funcion que obtiene los nombres de los archivos, sin la extencion
const removeExtension = (filename) => {
    return filename.split('.').shift();
}

// funcion que carga el nombre de los archivos como ruta.
const a = fs.readdirSync(PATH_ROUTES).filter((file) => {
    const name = removeExtension(file);

    if(name !== 'index') {
        router.use(`/${name}`, require(`./${file}`));
    }
});

module.exports = router