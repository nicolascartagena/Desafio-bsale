const Product = require('../models/product');
const { handleHttpError } = require('../utils/handleError');
const { Op } = require('sequelize');

const getItems = async (req, res) => {
    try {
        const results = await Product.findAllData();
        res.json({
            results
        });
    } catch (e) {
        console.log(e);
        handleHttpError(res,e,500);
    }
}

const getItem = async (req, res) => {
    try{
        const name = req.body.name;

        const results = await Product.findAll({
            where: {
                name: {
                    [Op.like]: `%${name}%`
                }
            }
        });
        console.log(name)
        console.log(results)

        res.json({
            results
        })
    } catch(e) {
        console.log(e);
        handleHttpError(res, e, 500);
    }
}


module.exports = {
    getItems,
    getItem
}