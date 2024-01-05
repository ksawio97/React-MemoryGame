/**
 * 
 * @param {Array<any>} arr 
 */
function shuffleArr(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const swapIndex = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[swapIndex]] = [arr[swapIndex], arr[i]];
    }
}

/**
 * 
 * @param {Array<any>} arr 
 * @returns 
 */
function shuffledArr(arr) {
    shuffleArr(arr);
    return arr;
}

/**
 * 
 * @param {Array<any>} arr 
 * @param {Number} count 
 * @returns returns count random elements
 */
function getRandomElements(arr, count) {
    return shuffledArr([...arr]).splice(0, count);
}

module.exports = {shuffleArr, shuffledArr, getRandomElements};