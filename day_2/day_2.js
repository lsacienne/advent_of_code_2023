const { sign } = require('crypto');
const fs = require('fs');
const data = fs.readFileSync('./input', 'utf8');

const games = data.split('\n').map(x => x.split(' '));
const sign_values = new Map([
    ['X', 1],
    ['Y', 2],
    ['Z', 3],
    ['A', 1],
    ['B', 2],
    ['C', 3]
]);

const ultra_top_secret_sign_values = new Map([
    ['X', 0],
    ['Y', 3],
    ['Z', 6]
]);
const mapper = new Map([
    [1, 3],
    [2, 1],
    [3, 2]
]);

let result_1 = games
.map(g => g.map(el => sign_values.get(el)))
.map(g => g[1] + (g[0]%3+1 === g[1] ? 6 : (g[0] === g[1]%3+1 ? 0 : 3)))
.reduce((a,b) => a+b, 0);

let result_2 = games.
map(g => [sign_values.get(g[0]),ultra_top_secret_sign_values.get(g[1])])
.map(g => g[1] + (g[1] === 0 ? mapper.get(g[0]) : (g[1] === 6 ? g[0]%3+1 : g[0])))
.reduce((a,b) => a+b, 0);

console.log("ANSWER 1:\n",result_1);
console.log("ANSWER 2:\n",result_2);