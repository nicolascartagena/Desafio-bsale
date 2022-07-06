const { sequelize } = require('../config/mysql');
const { DataTypes } = require("sequelize");
const Category = require('./category');

// Modelo
const Product = sequelize.define('product',{
    // name - url_image - price - discount - category
    name: {
        type: DataTypes.STRING
    },
    url_image: {
        type: DataTypes.STRING
    },
    price: {
        type: DataTypes.FLOAT
    },
    discount: {
        type: DataTypes.INTEGER
    },
    category: {
        type: DataTypes.INTEGER
    }
},
{
    freezeTableName: true,
    timestamps: false
});

Product.findAllData = function () {
    Product.belongsTo(Category,{
        foreignKey: 'category',
        as: 'Category'
    });

    return Product.findAll({include:'Category'})
};

module.exports = Product;