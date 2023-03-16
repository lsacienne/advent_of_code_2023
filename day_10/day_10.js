const fs = require('fs');
const data = fs.readFileSync('./input', 'utf8');

const instructions = data.split('\n').map(lin => lin === "noop" ? [lin] : lin.split(' '));
let register = 1;
let nOp = 0;
let nMeasure = 0;
const signals = [];


//const CRT = Array.apply(null,Array(240)).map(() => '.');
const CRT = [];
const timeProcess = new Map([
    ["noop",1],
    ["addx",2]
]);

for(let inst of instructions) {
    let toDO = timeProcess.get(inst[0]);
    do {
        if(register-1 <= nOp%40 && register+1 >= nOp%40) {
            CRT.push('#');
        } else {
            CRT.push('.');
        }
        if(++nOp === 20 + 40 * nMeasure) {
            signals.push(nOp*register);
            nMeasure++;
        }

    } while(--toDO > 0);
    register += inst.length === 2 ? parseInt(inst[1]) : 0;
}

console.log("ANSWER 1:\n",signals.slice(0,6).reduce((a,b) => a + b,0));

console.log("ANSWER 2:");
console.log(CRT.join('').match(/.{40}/g).join('\n'));

