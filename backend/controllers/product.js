const Product = require('../models/product');

const getItems = async (req, res) => {
    const results = await Product.findAllData();
    res.json({
        results
    });
}



module.exports = {
    getItems
}