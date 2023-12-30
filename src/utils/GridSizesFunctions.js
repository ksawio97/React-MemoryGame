/**
 * 
 * @param {Number} distinctNodes 
 * @returns {[Number, Number]} grid size ([rows, columns]) with emphasis on bigger column size
 */
const getGridSize = (distinctNodes) => {
    const columnCount = Math.sqrt(distinctNodes * 2);
    const rowsCount = Math.floor(columnCount);
    return [rowsCount, rowsCount + Number(rowsCount !== columnCount)];
}

/**
 * 
 * @param {Number} elementId 
 * @param {Number} columnCount 
 * @returns {Number}
 */
const getElementRow = (elementId, columnCount) => 
    Math.floor(elementId / columnCount) + 1;

/**
 * 
 * @param {Number} elementId 
 * @param {Number} columnCount 
 * @returns {Number}
 */
const getElementColumn = (elementId, columnCount) => 
    (elementId % columnCount) + 1;

/**
 * 
 * @param {Number} count 
 * @returns {String}
 */
const getGridTemplate = (count) => 
    Array.from({length: count}, () => '1fr').join(' ');

module.exports = {
    getGridSize,
    getElementRow, 
    getElementColumn,
    getGridTemplate
};