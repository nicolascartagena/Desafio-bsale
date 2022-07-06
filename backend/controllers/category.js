const Category = require('../models/category');

const getCategory = async (req, res) => {
    const results = await Category.findAll({raw: true});
    res.json({
        results
    });
}

module.exports = {
    getCategory
}