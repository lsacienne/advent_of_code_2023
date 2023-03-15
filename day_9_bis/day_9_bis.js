const fs = require('fs');
const data = fs.readFileSync('./input', 'utf8');

const instructions = data.split('\n').map(lin => lin.split(' ').map(el => isNaN(parseInt(el)) ? el : parseInt(el,0)));

/**
 * 
 * @param {Array<number>} arr1 
 * @param {Array<number>} arr2 
 * @returns 
 */
function isEqualArray(arr1,arr2) {
    if (arr1 === arr2) {
        return true;
    }
    if (arr1.length !== arr2.length) {
        return false;
    }
    for(let i=0; i < arr1.length; ++i) {
        if (arr1[i] !== arr2[i]) {
            return false;
        }
    }
    return true;
}

class Grid {
    constructor(instructions,size) {
        this.head = [0,0];

        this.tail = Array.apply(null,Array(size)).map(() => [this.head[0],this.head[1]]);
        console.log(this.tail);

        this.instructions = instructions;

        this.visited = [[...this.head]];

        this.min_x = 0;
        this.max_x = 0;
        this.min_y = 0;
        this.max_y = 0;
    }

    addVisted(coordX,coordY) {
        let toAdd = [coordX,coordY];
        for(let vis of this.visited) {
            if (isEqualArray(vis,toAdd)) {
                return;
            }
        }
        this.visited.push(toAdd);
    }

    getVisitedNumber() {
        for (let inst of this.instructions) {
            for(let i=0; i < inst[1];++i) {
                switch(inst[0]) {
                    case 'L': {
                        this.goLeft();
                        break;
                    }
                    case 'R': {
                        this.goRight();
                        break;
                    }
                    case 'D': {
                        this.goDown();
                        break;
                    }
                    case 'U': {
                        this.goUp();
                        break;
                    }
                }
            }
        }
        return this.visited.length;
    }

    moveHead(deltaX,deltaY) {
        this.head[0] += deltaX;
        this.head[1] += deltaY;
        this.min_x = this.head[0] < this.min_x ? this.head[0] : this.min_x;
        this.max_x = this.head[0] > this.max_x ? this.head[0] : this.max_x;
        this.min_y = this.head[1] < this.min_y ? this.head[1] : this.min_y;
        this.max_y = this.head[1] > this.max_y ? this.head[1] : this.max_y;
        this.moveTail(deltaX+deltaY);
    }

    plotVisited() {
        let grid = [];
        for(let j=0;j<this.max_y-this.min_y+1;j++) {
            let row = [];
            for(let i=0; i < this.max_x-this.min_x+1;i++) {
                let coords = [i+this.min_x,j+this.min_y];
                row.push('.');
                for (let vis of this.visited) {
                    if(isEqualArray(coords,vis)) {
                        row[i] = "#";
                        if (vis === this.visited[0]) {
                            row[i] = "s";
                        }
                    }
                }
            }
            grid.push(row.join(''));
        }
        console.log(grid.join('\n'));
    }

    goRight() {
        this.moveHead(1,0);
    }

    goLeft() {
        this.moveHead(-1,0);
    }

    goUp() {
        this.moveHead(0,-1);
    }

    goDown() {
        this.moveHead(0,1);
    }

    moveTail(delta) {
        //console.log("new chain");
        if (Math.abs(this.head[0] - this.tail[0][0]) > 1) {
            this.tail[0][1] = this.head[1];
            this.tail[0][0] += delta;
        } else if (Math.abs(this.head[1] - this.tail[0][1]) > 1) {
            this.tail[0][0] = this.head[0];
            this.tail[0][1] += delta;
        }
        if (this.tail.length > 1) {
            this.moveNextKnot(delta);
        } else {
            this.addVisted(this.tail[0][0],this.tail[0][1]);
        }
    }

    moveNextKnot(delta) {
        for(let nKnot = 1; nKnot < this.tail.length;++nKnot) {
            let x_delta = this.tail[nKnot-1][0] - this.tail[nKnot][0] === 0 ? 0 : (this.tail[nKnot-1][0] - this.tail[nKnot][0])/Math.abs(this.tail[nKnot-1][0] - this.tail[nKnot][0]) ;
            let y_delta = this.tail[nKnot-1][1] - this.tail[nKnot][1] === 0 ? 0 : (this.tail[nKnot-1][1] - this.tail[nKnot][1])/Math.abs(this.tail[nKnot-1][1] - this.tail[nKnot][1]) ;
            if (Math.abs(this.tail[nKnot-1][0] - this.tail[nKnot][0]) > 1 && Math.abs(this.tail[nKnot-1][1] - this.tail[nKnot][1]) > 1) {
                this.tail[nKnot][0] += x_delta;
                this.tail[nKnot][1] += y_delta;
            }
            else 
            if(Math.abs(this.tail[nKnot-1][0] - this.tail[nKnot][0]) > 1) {
                this.tail[nKnot][1] = this.tail[nKnot-1][1];
                this.tail[nKnot][0] += x_delta;
            }
            else if (Math.abs(this.tail[nKnot-1][1] - this.tail[nKnot][1]) > 1) {
                this.tail[nKnot][0] = this.tail[nKnot-1][0];
                this.tail[nKnot][1] += y_delta;
            }
            //console.log(Math.abs(this.tail[nKnot-1][0] - this.tail[nKnot][0]),Math.abs(this.tail[nKnot-1][1] - this.tail[nKnot][1]),this.tail[nKnot],this.tail[nKnot-1]);
        }
        this.addVisted(this.tail[this.tail.length-1][0],this.tail[this.tail.length-1][1]);
    }
}

let grid_des_1 = new Grid(instructions,1);
console.log("ANSWER 1:\n",grid_des_1.getVisitedNumber());
grid_des_1.plotVisited();
let grid_des_2 = new Grid(instructions,9);
console.log("ANSWER 2:\n",grid_des_2.getVisitedNumber());
grid_des_2.plotVisited();