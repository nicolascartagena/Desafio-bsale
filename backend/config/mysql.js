const { Sequelize } = require('sequelize');

// Constantes para la conexion
const host = process.env.DATABASE_HOST;
const username = process.env.DATABASE_USER;
const password = process.env.DATABASE_PASSWORD;
const database = process.env.DATABASE_NAME;

const sequelize = new Sequelize(
    database,
    username,
    password,
    {
        host,
        dialect: "mysql"
    }
);

const conexionDB = async () => {
    try {
        await sequelize.authenticate();
        console.log("Conexión Establecida");
    } catch(e) {
        console.log("ERROR EN LA CONEXION", e);
    }
}

module.exports = {
    sequelize,
    conexionDB
}