// Librerias necesarias
require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Constantes necesarias
const app = express();
const port = process.env.PORT || 3001;


app.listen(port, () => (
    console.log(`La app esta lista en http://localhost:${port}`)
));