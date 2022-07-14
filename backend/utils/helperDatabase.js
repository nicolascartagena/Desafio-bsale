/**
 * Función que obtiene el limit y el offset para la base de datos
 * @param {int} page 
 * @param {int} size 
 * @returns 
 */
 const getPage = (page, size) => {
    const limit = size ? +size : 3;
    const offset = page ? page * limit : 0;
    return {limit,offset}
}

/**
 * Función que eliminar del array las filas que tengan un url_image sin un path
 * @param {array} productsDB 
 * @param {int} count 
 * @returns 
 */
const missingData = (productsDB, count) => {
    const products = productsDB.filter((product) => {
        return product.url_image !== "" && product.url_image !== null
    });
    return {products, count}
}

module.exports = {
    getPage,
    missingData
}