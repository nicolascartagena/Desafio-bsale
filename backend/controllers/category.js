const Category = require('../models/category');
const { handleHttpError } = require('../utils/handleError');

const getCategory = async (req, res) => {
    try {
        const results = await Category.findAll({raw: true});
        res.json({
            results
        });
    } catch (error) {
        handleHttpError(res, error, 500)
    }
}

module.exports = {
    getCategory
}