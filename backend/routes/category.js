// importación de modulos y librerias requeridas
const express = require('express');
const router = express.Router();
const { getCategory } = require('../controllers/category');

// ruta para obtener todas las categorias.
router.get('/', getCategory);

module.exports = router;