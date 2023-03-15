const fs = require('fs');
const data = fs.readFileSync('./input', 'utf8');

const pairsRanges = data.split("\n")
.map(p => p.split(",")
    .map(a => a.split("-")
    .map(el => parseInt(el)))
    .map(il => Array.from({length: (il[1]-il[0]+1)}, (v,k) => k + il[0])));

let subsequence_counter = 0;
let partial_overlap_counter = 0;

for (let pair of pairsRanges) {
    console.log()
    if (checkSubsequence(pair[0],pair[1])) {
        subsequence_counter++;
    }
    if (checkPartialOverlap(pair[0],pair[1])) {
        partial_overlap_counter++;
    }
}

console.log("ANSWER 1\n",subsequence_counter);
console.log("ANSWER 2\n",partial_overlap_counter);

/**
 * 
 * @param {Array<number>} range1 
 * @param {Array<number>} range2 
 */
function checkSubsequence(range1, range2) {
    let small_range = range1, great_range = range2;
    if (range1.length > range2.length) {
        small_range = range2;
        great_range = range1;
    }
    for (let elem of small_range) {
        if (!(great_range.includes(elem))) {
            return false;
        }
    }
    return true;
}

/**
 * 
 * @param {Array<number>} range1 
 * @param {Array<number>} range2 
 * @returns 
 */
function checkPartialOverlap(range1, range2) {
    let small_range = range1, great_range = range2;
    if (range1.length > range2.length) {
        small_range = range2;
        great_range = range1;
    }
    for (let elem of small_range) {
        if (great_range.includes(elem)) {
            return true;
        }
    }
    return false;
}