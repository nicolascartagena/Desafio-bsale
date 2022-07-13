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

// Asociación de las tablas
Product.belongsTo(Category,{
    foreignKey: 'category',
    as: 'Category'
});

// Función para retornar los datos de la base de datos con la paginación
Product.findAllData = function (limit, offset) {    
    return Product.findAndCountAll({
        limit: limit,
        offset: offset,
        include:'Category'
    });
};

// Función para retornar los datos, pero con una condición.
Product.findAllCondition = function (condition, limit, offset) {
    return Product.findAndCountAll({ 
        include: 'Category', 
        where: condition,
        limit: limit,
        offset: offset
    });
}

module.exports = Product;