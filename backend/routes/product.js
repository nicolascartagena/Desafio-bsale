// importación de modulos y librerias requeridas
const express = require('express');
const router = express.Router();
const { getItems, getItem, filterItems } = require('../controllers/product');

// ruta para obtener todos los productos
router.get('/', getItems);

// ruta para buscar el producto por nombre
router.post('/', getItem);

// ruta para obtener todos los productos por categoria.
router.post('/filter', filterItems);

module.exports = router;