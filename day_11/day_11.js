const fs = require('fs');
const { parse } = require('path');
const data = fs.readFileSync('./input', 'utf8');

const monkeyTexts = data.split('\n\n').map(m => m.split('\n').map(lin => lin.replaceAll('  ','')));
const monkeyList = [];

class Monkey {
    constructor(monkeyDesc) {
        this.itemInspected = 0;
        this.no = monkeyDesc[0].match(/[0-9]+/g).map(el => parseInt(el)).reduce((a,b) => a + b);
        this.items = monkeyDesc[1].replace('Starting items: ','').split(', ').map(n => [parseInt(n)]);
        this.fetchItems = [];
        this.newRule = this.buildNewRule(monkeyDesc[2].replace('Operation: new = ','').split(' '));
        this.divisable = monkeyDesc[3].match(/[0-9]+/g).map(el => parseInt(el)).reduce((a,b) => a + b, 0);
        this.trueThrow = monkeyDesc[4].match(/[0-9]+/g).map(el => parseInt(el)).reduce((a,b) => a + b, 0);
        this.falseThrow = monkeyDesc[5].match(/[0-9]+/g).map(el => parseInt(el)).reduce((a,b) => a + b, 0);
        this.commonDivider = 1;
    }

    computeThrow(divideFactor) {
        let trueThrowKey = this.trueThrow, falseThrowKey = this.falseThrow;
        let toThrowTrue = [], toThrowFalse = [];
        for(let it of this.items) {
            this.itemInspected++;
            let val_it = it[0];
            it[0] = this.newRule(val_it,this.nbOp);
            if (divideFactor === 1) {
                it[0] %= this.commonDivider;
            } else {
                it[0] = Math.floor(ruleApplied / divideFactor);
            }
            if (it[0] % this.divisable === 0) {
                toThrowTrue.push(it);
            } else {
                toThrowFalse.push(it);
            }
        }
        this.items = [];
        return new Map([
            [trueThrowKey,toThrowTrue],
            [falseThrowKey, toThrowFalse]
        ]);
    }

    addItems(arr) {
        this.items = this.items.concat(arr);
    }

    fetchThrow(arr) {

        this.fetchItems = this.fetchItems.concat(arr);
    }
    applyFetch() {
        this.items = [...this.fetchItems];
        this.fetchItems = [];
    }

    toString() {
        let objv = Object.keys(this);
        return `
        ${objv[1]}: ${this.no}
        ${objv[2]}: ${this.items}
        ${objv[3]}: ${this.fetchItems}
        ${objv[4]}: ${this.newRule}
        ${objv[5]}: ${this.divisable}
        ${objv[6]}: ${this.trueThrow}
        ${objv[7]}: ${this.falseThrow}
        ${objv[0]}: ${this.itemInspected}
        `
    }

    buildNewRule(opArray) {
        let [el1,op,el2] = opArray;
        if (el1 === 'old' && el2 === 'old') {
            this.nbOp = 0;
            if (op === '*') {
                return (prev,nbOp) => prev*prev;
            } else {
                return (prev,nbOp) => prev+prev;
            }
        } else if (el1 === 'old') {
            this.nbOp = parseInt(el2);
            if (op === '*') {
                return (prev,nbOp) => prev*nbOp;
            } else {
                return (prev,nbOp) => prev+nbOp;
            }
        } else {
            this.nbOp = parseInt(el1);
            if (op === '*') {
                return (prev,nbOp) => prev*nbOp;
            } else {
                return (prev,nbOp) => prev+nbOp;
            }
        }
    }
}
let commonDivider = 1;
for(let monkey of monkeyTexts) {
    let monkey_Obj = new Monkey(monkey);
    monkeyList.push(monkey_Obj);
    commonDivider *= monkey_Obj.divisable;
}
console.log(commonDivider);

for(let monkey of monkeyList) {
    monkey.commonDivider = commonDivider;
}
for(let j =0; j < 10000; ++j) {
    for (let monkey of monkeyList) {
        let objToThrow = monkey.computeThrow(1);
        for(let i =0; i < monkeyList.length; ++i) {
            if (objToThrow.has(i)) {
                monkeyList[i].addItems(objToThrow.get(i));
            }
        }
    }
}

for(let monkey of monkeyList) {
    console.log(monkey.toString());
}

let sortedMonkey = monkeyList.sort((a,b) => b.itemInspected - a.itemInspected); 

console.log("ANSWER 1\n",sortedMonkey[0].itemInspected*sortedMonkey[1].itemInspected);

//console.log(monkeyTexts);