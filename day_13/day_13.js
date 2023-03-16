const fs = require('fs');
const data = fs.readFileSync('./input', 'utf8');

/**
 * 
 * @param {Array} packet1 
 * @param {Array} packet2 
 */
function comparePackets(packet1,packet2) {
    for(let i =0; i < Math.max(packet1.length,packet2.length); ++i) {
        //console.log(packet1[i],packet2[i]);
        if (!packet2[i]) return -1;
        if (!packet1[i]) return 1;

        if (typeof packet1[i] === 'number' && typeof packet2[i] === 'number') {
            if (packet1[i] < packet2[i]) return 1;
            if (packet1[i] > packet2[i]) return -1;
        } else if ( typeof packet1[i] === 'object' && typeof packet2[i] === 'object' ) {
            let comp = comparePackets(packet1[i],packet2[i]);
            if (comp === 1) {
                return 1;
            } else if (comp === -1) {
                return -1;
            }
        } else if (typeof packet1[i] === 'number') {
            let comp = comparePackets([packet1[i]],packet2[i]);
            if (comp === 1) {
                return 1;
            } else if (comp === -1) {
                return -1;
            }
        } else if (typeof packet2[i] === 'number') {
            let comp = comparePackets(packet1[i],[packet2[i]]);
            if (comp === 1) {
                return 1;
            } else if (comp === -1) {
                return -1;
            }
        } 
    }

    return 0;
}


const packets = data.split('\n\n').map(group => group.split('\n').map(ls => eval(ls)));

let index = 1;
let valid_indexes = [];

for (let pck_group of packets) {
    comparePackets(pck_group[0],pck_group[1]) > 0 ? valid_indexes.push(index) : console.log(`index ${index} is not valid`);
    index++;
}

console.log("ANSWER 1\n",valid_indexes.reduce((a,b) => a+b,0));
