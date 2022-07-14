// importación de modulos y librerias requeridas
const Product = require('../models/product');
const { handleHttpError } = require('../utils/handleError');
const { Op } = require('sequelize');
const { getPage,missingData } = require('../utils/helperDatabase');

/**
 * Función que obtiene todos los productos de la base de datos
 * @param {*} req 
 * @param {*} res 
 */
const getItems = async (req, res) => {
    try {
        const page = req.query.page; // Obtener el numero de pagina desde la url
        const {limit, offset} = getPage(page, 12); // obtenemos el limit y offset para la consulta
        const data = await Product.findAllData(limit, offset); // consulta con paginacion
        const {products, count} = missingData(data.rows, data.count); // limpieza de los registros sin imagenes
        // constante que se enviara al frontend.
        const results = {
            count,
            rows: products
        }
        
        // respuesta que se envia al frontend
        res.json({
            results
        });
        
    } catch (e) {
        // funcion que maneja los errores que se puedan producir.
        handleHttpError(res,e,500);
    }
}

/**
 * Función que obtiene los productos de la base de datos que tengan coincidencia con el nombre enviado.
 * @param {*} req 
 * @param {*} res 
 */
const getItem = async (req, res) => {
    try{
        // obtener el numero de la pagina y el nombre del producto que se esta buscando
        const {page, name} = req.body;

        // se calcula el limit y offset para la consulta
        const {limit, offset} = getPage(page, 12);

        // se prepara la consulta
        const condition = {
            name: {
                [Op.like]: `%${name}%`
            }
        }

        // se realiza la consulta a la base de datos
        const data = await Product.findAllCondition(condition, limit, offset);

        // limpieza de los registros que no tenga el path de la imagen
        const {products, count} = missingData(data.rows, data.count);

        // constante que se enviara al frontend
        const results = {
            count,
            rows: products
        }

        // respuesta que se envia al frontend
        res.json({
            results
        });

    } catch(e) {
        // funcion que maneja los errores que se puedan producir.
        handleHttpError(res, e, 500);
    }
}

/**
 * Función que obtiene los productos de la base de datos, dependiendo del filtro aplicado
 * @param {*} req 
 * @param {*} res 
 */
const filterItems = async (req, res) => {
    try {
        // obtener la pagina y la categoria de los productos
        const {page, category} = req.body;

        // se calcula el limit y offset para la consulta
        const {limit, offset} = getPage(page, 12);

        // se define la condición de la consulta
        const condition = {
            category: category
        }

        // se realiza la consulta a la base de datos
        const data = await Product.findAllCondition(condition, limit, offset);

        // limpieza de los registros que no tenga el path de la imagen
        const {products, count} = missingData(data.rows, data.count);

        // constante que se enviara al frontend
        const results = {
            count,
            rows: products
        }

        // respuesta que se envia al frontend
        res.json({
            results
        });

    } catch (e) {
        // funcion que maneja los errores que se puedan producir.
        handleHttpError(res, e, 500);
    }
}



module.exports = {
    getItems,
    getItem,
    filterItems
}