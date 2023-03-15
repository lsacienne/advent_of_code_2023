const fs = require('fs');
const data = fs.readFileSync('./input', 'utf8');

let sliding_numbers = data.slice(0,4).split("");
let sliding_message = data.slice(0,14).split("");
let first_packet = 4;
let first_message = 14;

while (new Set(sliding_numbers).size < 4) {
    sliding_numbers.shift();
    sliding_numbers.push(data[first_packet++]);
    console.log(sliding_numbers);
}
while (new Set(sliding_message).size < 14) {
    sliding_message.shift();
    sliding_message.push(data[first_message++]);
    console.log(sliding_message);
}
console.log("ANSWER 1\n", first_packet);
console.log("ANSWER 2\n", first_message);