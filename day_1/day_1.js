const fs = require('fs');
const data = fs.readFileSync('./input', 'utf8');

const str_elfs = data.split('\n\n');

const elfs_carry_lists = [];

for (let elf_carry_str of str_elfs) {
    elfs_carry_lists.push(
        elf_carry_str.split('\n')
        .map(x => parseInt(x))
        .reduce((a,b) => a+b,0)
    );
}

console.log("ANSWER 1:");
console.log(Math.max(...elfs_carry_lists));

console.log("ANSWER 2:");
console.log(
    elfs_carry_lists
    .sort((a,b) => b - a)
    .slice(0,3)
    .reduce((a,b) => a+b, 0)
);