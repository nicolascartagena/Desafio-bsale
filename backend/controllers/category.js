// importación de modulos y librerias requeridas
const Category = require('../models/category');
const { handleHttpError } = require('../utils/handleError');

/**
 * Funcion que envia todas las categorias en la base de datos
 * @param {*} req 
 * @param {*} res 
 */
const getCategory = async (req, res) => {
    try {
        // consulta a la base de datos
        const results = await Category.findAll({raw: true}); // raw deshabilita un ajuste de sequelize y entrega una respuesta simple.

        // enviar los resultados al frontend
        res.json({
            results
        });
    } catch (error) {
        // funcion para el manejo de errores.
        handleHttpError(res, error, 500)
    }
}

module.exports = {
    getCategory
}