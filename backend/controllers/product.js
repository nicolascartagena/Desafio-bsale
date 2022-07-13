const Product = require('../models/product');
const { handleHttpError } = require('../utils/handleError');
const { Op } = require('sequelize');
const { getPage } = require('../utils/helperDatabase');

/**
 * Función que obtiene todos los productos de la base de datos
 * @param {*} req 
 * @param {*} res 
 */
const getItems = async (req, res) => {
    try {
        const page = req.query.page;
        const {limit, offset} = getPage(page, 12);
        const results = await Product.findAllData(limit, offset);
        res.json({
            results
        });
    } catch (e) {
        console.log(e);
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
        const {page, name} = req.body;
        const {limit, offset} = getPage(page, 12);
        const condition = {
            name: {
                [Op.like]: `%${name}%`
            }
        }

        const results = await Product.findAllCondition(condition, limit, offset);

        res.json({
            results
        })
    } catch(e) {
        console.log(e);
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
        const {page, category} = req.body;
        const {limit, offset} = getPage(page, 12);
        const condition = {
            category: category
        }

        const results = await Product.findAllCondition(condition, limit, offset);

        res.json({
            results
        });
    } catch (e) {
        console.log(e);
        handleHttpError(res, e, 500);
    }
}



module.exports = {
    getItems,
    getItem,
    filterItems
}