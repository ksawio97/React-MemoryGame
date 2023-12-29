/**
 * 
 * @param {Number} distinctNodes 
 * @returns {[Number, Number]} rows and columns count with occasional emphasis on column count 
 */
export function getGridSize(distinctNodes) {
    const columnCount = Math.sqrt(distinctNodes * 2);
    const rowsCount = Math.floor(columnCount);
    if (rowsCount === columnCount)
        return [rowsCount, columnCount];
    return [rowsCount, rowsCount + 1]
}