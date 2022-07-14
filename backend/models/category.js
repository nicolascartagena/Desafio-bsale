// importacion de las librerias y modulos requeridos
const { sequelize } = require('../config/mysql');
const { DataTypes } = require("sequelize");

// modelo de la tabla en la base de datos
const Category = sequelize.define('category', {
    //name
    name: {
        type: DataTypes.STRING
    }
},
{
    // restringir el nombre en plural
    freezeTableName: true,
    // impedir que agregue o solicite dos columnas de tiempo a la tabla
    timestamps: false
});

module.exports = Category;