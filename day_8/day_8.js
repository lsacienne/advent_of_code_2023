const fs = require('fs');
const data = fs.readFileSync('./input', 'utf8');

const matrix = data.split("\n").map(lin => lin.split("").map(tr => [parseInt(tr)]));
const row_len = matrix[0].length, col_len = matrix.length;
const visible = new Set();

for(let i = 0; i < col_len; ++i) {
    let max_left = -1;
    let max_right = -1;
    for(let j = 0; j < row_len-1; ++j) {
        if(j === 0) {
            visible.add(matrix[i][j]);
            visible.add(matrix[i][row_len-1-j]);
            max_left = matrix[i][j][0];
            max_right = matrix[i][row_len-1-j][0];
        } else {
            if(matrix[i][j][0] > max_left) {
                max_left = matrix[i][j][0];
                visible.add(matrix[i][j]);
            }
            if(matrix[i][row_len-1-j][0] > max_right) {
                max_right = matrix[i][row_len-1-j][0];
                visible.add(matrix[i][row_len-1-j]);
            }
        }
    }
}

for(let j = 0; j < row_len; ++j) {
    let max_top = -1;
    let max_bot = -1;
    for(let i = 0; i < col_len-1; ++i) {
        if(i === 0) {
            visible.add(matrix[i][j]);
            visible.add(matrix[col_len-1-i][j]);
            max_top = matrix[i][j][0];
            max_bot = matrix[col_len-1-i][j][0];
        } else {
            if(matrix[i][j][0] > max_top) {
                max_top = matrix[i][j][0];
                visible.add(matrix[i][j]);
            }
            if(matrix[col_len-1-i][j][0] > max_bot) {
                max_bot = matrix[col_len-1-i][j][0];
                visible.add(matrix[col_len-1-i][j]);
            }
        }
    }
}
//console.log(matrix);
console.log("ANSWER 1\n",visible.size);

function calculateScenic(tree_x,tree_y,map,height,width) {
    //console.log(map[tree_y][tree_x]);
    let tree_height = map[tree_y][tree_x][0];
    let up = 1, down = 1, left = 1, right = 1;
    // Calculate in up direction
    while(tree_y-up > 0 && map[tree_y-up][tree_x][0] < tree_height) {
        up++;
    }
    while(tree_y+down < height-1 && map[tree_y+down][tree_x][0] < tree_height) {
        down++;
    }
    while(tree_x-left > 0 && map[tree_y][tree_x-left][0] < tree_height) {
        left++;
    }
    
    while(tree_x+right < width-1 && map[tree_y][tree_x+right][0] < tree_height) {
        right++;
    }
    //console.log(up,down,left,right);
    return up*down*left*right;

}
let max_scenic = -1;
for (let i = 1; i < col_len-1; ++i) {
    for (let j = 1; j < row_len-1; ++j) {
        let cur_scenic = calculateScenic(j,i,matrix,col_len,row_len);
        if (max_scenic < cur_scenic) {
            max_scenic = cur_scenic;
        }
    }
}
console.log("ANSWER 2\n",max_scenic);

//console.log(calculateScenic(2,1,matrix,col_len,row_len));

