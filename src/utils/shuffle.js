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

module.exports = {shuffleArr, shuffledArr};