const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf8');

const [crates, instructions] = data.split("\n\n");

const crates_lines = crates.split("\n").map(lin => lin.match(/.{3}[ ]?/g).map(el => el.match(/[A-Z0-9]/g) ? el.match(/[A-Z0-9]/g)[0] : 0));
let crates_colums = Array.from({length:crates_lines[0].length}, (v,k) => []);
for (let line of crates_lines) {
    let col = 0;
    for(let el of line) {
        if (!(el === 0 || el.match(/[0-9]/))) {
            crates_colums[col].push(el);
        }
        col++;
    }
}
let crates_columns_9001 = crates_colums.map(x => x.map(y => y));
const instruction_array = instructions.split("\n").map(lin => lin.match(/[0-9]+/g).map(el => parseInt(el)));
for (let inst of instruction_array) {
    crates_colums = follow_instruction(crates_colums,inst);
    crates_columns_9001 = follow_instruction_9001(crates_columns_9001,inst);
}
/**
 * 
 * @param {Array<Array<string>>} cols 
 * @param {Array<number>} inst 
 */
function follow_instruction(cols, inst) {
    //console.log(cols,inst);
    for (let i = 0; i < inst[0]; ++i) {
        cols[inst[2]-1].unshift(cols[inst[1]-1][0]);
        cols[inst[1]-1].shift();
    }
    return cols
}

/**
 * 
 * @param {Array<Array<string>>} cols 
 * @param {Array<number>} inst 
 */
 function follow_instruction_9001(cols, inst) {
    let stack_array = [];
    for (let i = 0; i < inst[0]; ++i) {
        stack_array.unshift(cols[inst[1]-1][0])
        cols[inst[1]-1].shift();
    }
    console.log(cols,inst,stack_array)
    for (let i = 0; i < stack_array.length; ++i) {
        cols[inst[2]-1].unshift(stack_array[i]);
    }
    return cols
}

console.log("ANSWER 1\n",crates_colums.map(col => col[0]).join(""));
console.log("ANSWER 2\n",crates_columns_9001.map(col => col[0]).join(""));