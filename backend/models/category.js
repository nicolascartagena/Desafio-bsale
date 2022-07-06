const { sequelize } = require('../config/mysql');
const { DataTypes } = require("sequelize");

const Category = sequelize.define('category', {
    //name
    name: {
        type: DataTypes.STRING
    }
},
{
    freezeTableName: true,
    timestamps: false
});

module.exports = Category;