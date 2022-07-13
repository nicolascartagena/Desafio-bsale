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

module.exports = {
    getPage
}