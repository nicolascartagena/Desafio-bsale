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

        const condition = {
            name: {
                [Op.like]: `%${name}%`
            }
        }

        const results = await Product.findAllCondition(condition);

        res.json({
            results
        })
    } catch(e) {
        console.log(e);
        handleHttpError(res, e, 500);
    }
}

const filterItems = async (req, res) => {
    try {
        const category = req.body.category;

        const condition = {
            category: category
        }

        const results = await Product.findAllCondition(condition);

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