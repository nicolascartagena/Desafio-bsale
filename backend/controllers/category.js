const Category = require('../models/category');

const getCategory = async (req, res) => {
    const results = await Category.findAll();
    res.send({
        results
    });
}

module.exports = {
    getCategory
}