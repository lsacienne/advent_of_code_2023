const fs = require('fs');
const data = fs.readFileSync('./input', 'utf8');

const priorities = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const prioritiesMap = new Map();
const isPresentMap = new Map();

for(let i = 0; i < priorities.length; ++i) {
    prioritiesMap.set(priorities[i],i+1);
    isPresentMap.set(i+1, true);
}

const rucksacks = data.split("\n").map(rs => [rs.slice(0,rs.length/2),rs.slice(rs.length/2)].map(comp => comp.split("").map(el => prioritiesMap.get(el))));
const ruckscak_merged = rucksacks.map(rs => rs[0].concat(rs[1]));

const grouped_rucksacks = [];
let current_group = [];
let badgesSum = 0;

for (let i = 0; i < ruckscak_merged.length; ++i) {
    if (i%3 === 0) {
        current_group = [];
    }
    current_group.push(ruckscak_merged[i]);
    if (i%3 === 2) {
        grouped_rucksacks.push(current_group);
    }
}

for (let group of grouped_rucksacks) {
    for (let elem of group[0]) {
        if (group[1].includes(elem) && group[2].includes(elem)) {
            console.log(group,elem);
            badgesSum += elem;
            break;
        }
    }
}

let prioritiesSum = 0;

for (let rucksack of rucksacks) {
    let twiceElems = [];
    console.log(rucksack);
    for (let elem of rucksack[0]) {
        if (rucksack[1].includes(elem) && !twiceElems.includes(elem)) {
            twiceElems.push(elem);
        }
    }
    //console.log(twiceElems)
    prioritiesSum += twiceElems.reduce((a,b) => a + b,0);
}

// Expected for example 157
console.log("ANSWER 1 :\n",prioritiesSum);

//Expected for example 70
console.log("ANSWER 2 :\n",badgesSum);