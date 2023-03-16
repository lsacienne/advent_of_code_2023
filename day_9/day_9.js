const fs = require('fs');
const data = fs.readFileSync('./example', 'utf8');
const grid = fs.readFileSync('./grid','utf8').split('\n').map(lin => lin.split('').map(el => [el]));
const instructions = data.split('\n').map(lin => lin.split(' ').map(el => isNaN(parseInt(el)) ? el : parseInt(el,0)));
console.log(instructions);
console.log(grid);

const head = 'H', tail = 'T', visited = '#', place='.';

class Grid {
    constructor(grid,instructions) {
        this.grid = grid;
        let head_val = this.findHead(this.grid);

        this.head_x = head_val.x;
        this.head_y = head_val.y;

        this.tail_x = this.head_x;
        this.tail_y = this.head_y;

        this.start_x = this.head_x;
        this.start_y = this.head_y;

        this.instructions = instructions;

        this.visited = new Set([this.grid[this.start_y][this.start_x]]);
    }

    getVistedNumber() {
        for (let inst of this.instructions) {
            for(let i=0; i < inst[1];++i) {
                switch(inst[0]) {
                    case 'L': {
                        grid_des.goLeft();
                        break;
                    }
                    case 'R': {
                        grid_des.goRight();
                        break;
                    }
                    case 'D': {
                        grid_des.goDown();
                        break;
                    }
                    case 'U': {
                        grid_des.goUp();
                        break;
                    }
                }
            }
        }
        return grid_des.visited.size;
    }

    display_grid() {
        for(let lin of this.grid) {
            for(let col of lin) {
                if (this.visited.has(col)) {
                    col[0] = visited;
                }
            }
        }

        console.log(grid.map(lin => lin.map(el => el).join('')).join('\n'));
    }

    changeValue(coordX,coordY,value) {
        this.grid[coordY][coordX][0] = value;
    }

    moveHead(deltaX,deltaY) {
        if (this.visited.has(this.grid[this.head_y][this.head_x])) {
            this.changeValue(this.head_x,this.head_y,visited);
        } else {
            this.changeValue(this.head_x,this.head_y,place);
        }
        this.head_x += deltaX;
        this.head_y += deltaY;
        this.moveTail(deltaX+deltaY);
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
        if (Math.abs(this.head_x - this.tail_x) > 1) {
            this.tail_y = this.head_y;
            this.tail_x += delta;
        } else if (Math.abs(this.head_y - this.tail_y)) {
            this.tail_x = this.head_x;
            this.tail_y += delta;
        }
        this.visited.add(this.grid[this.tail_y][this.tail_x]);
    }

    findHead(grid) {
        let x, y = 0;
        for(let lin of grid) {
            x = 0;
            for(let col of lin) {
                if (col[0] === head) {
                    return {x:x,y:y};
                }
                ++x;
            }
            ++y;
        }
    }
}

const grid_des = new Grid(grid,instructions);
grid_des.display_grid();
console.log("ANSWER 1:\n",grid_des.getVistedNumber());

