const fs = require('fs');
const data = fs.readFileSync('./input', 'utf8');

class Node {
    /**
     * 
     * @param {String} value 
     * @param {Array<Node>} nextNodes 
     */
    constructor(value='a', startingNode=false,endingNode=false,nextNodes=[]) {
        this.startingNode = startingNode;
        this.endingNode = endingNode;
        this.previousNode = null;
        if (value === 'E') {
            this.value = 25;
            this.distance = Infinity;
        } else if(value === 'S') {
            this.value = 0;
            this.distance = Infinity;
        } else {
            this.value = value.charCodeAt(0) - 'a'.charCodeAt(0);
            this.distance = Infinity;
        }

        if (this.startingNode) {
            this.distance = 0;
        }
        this.nextNodes = nextNodes;
    }

    copy() {
        let newNode = new Node();
        newNode.value = this.value;
        newNode.distance = this.distance;
        newNode.startingNode = this.startingNode;
        newNode.endingNode = this.endingNode;
    }

    /**
     * 
     * @param {number} x 
     * @param {number} y 
     * @param {Array<Array<Node>>} grid 
     */
    calculateNextNode(x,y,grid) {
        this.x = x;
        this.y = y;
        if (grid[y+1] && grid[y+1][x] && grid[y+1][x].value <= this.value + 1) {
            this.nextNodes.push(grid[y+1][x]);
        }
        if(grid[y-1] && grid[y-1][x] && grid[y-1][x].value <= this.value + 1) {
            this.nextNodes.push(grid[y-1][x]);
        }
        if(grid[y][x-1] && grid[y][x-1].value <= this.value + 1) {
            this.nextNodes.push(grid[y][x-1]);
        }
        if(grid[y][x+1] && grid[y][x+1].value <= this.value + 1) {
            this.nextNodes.push(grid[y][x+1]);
        }
    }
}

/**
 * 
 * @param {Node} node 
 * @param {Node} eNode 
 */
function goThroughGraph(node, eNode,min,maxDistance,way=[],wayList=[]) {
    if (maxDistance > Math.pow(node.x-eNode.x,2) + Math.pow(node.y-eNode.y,2) || way.length < Math.min(...wayList.map(elWay => elWay.length),min) ) {
        for(let next of node.nextNodes) {
            if (next === eNode) {
                way.push(next);
                wayList.push(way);
            } else if (!way.includes(next)) {
                let newWay = [...way];
                newWay.push(next);
                goThroughGraph(next,eNode,min,maxDistance,newWay,wayList);
            }
        }
    } else {
        console.log("abandoned way: ",way.length);
    }
    return wayList;
}

/**
 * 
 * @param {Node} node 
 * @param {Array<Node>} graph_list 
 */
function dropNode(node,graph_list) {
    if (graph_list.includes(node)) {
        graph_list.splice(graph_list.indexOf(node),1);
    }
}

/**
 * 
 * @param {Array<Node>} graph_list 
 */
function findMin(graph_list) {
    let min = Infinity;
    let min_vertice = null;
    for (let vertice of graph_list) {
        if (vertice.distance <= min) {
            min = vertice.distance;
            min_vertice = vertice;
        }
    }
    return min_vertice;
}

/**
 * 
 * @param {Node} node1 
 * @param {Node} node2 
 */
function updateDistance(node1,node2) {
    if (node2.distance > node1.distance + 1) {
        node2.distance = node1.distance + 1;
        node2.previousNode = node1;
    }
}

function findMinimalPath(data) {
    const grid = data.split('\n').map(lin => lin.split('').map(el => new Node(el,el==='S',el==='E')));
    let startingNode = null;
    let endingNode = null;

    /**
     * Build the graph
     */
    for(let i = 0; i < grid.length; ++i) {
        for(let j = 0; j < grid[i].length; ++j) {
            grid[i][j].calculateNextNode(j,i,grid);
            if (grid[i][j].startingNode) {
                startingNode = grid[i][j];
            } else if(grid[i][j].endingNode) {
                endingNode = grid[i][j];
            }
        }
    }

    /**
     * Run dijkstra to compute the distances of each vertices
     */
    const q_grid = [...grid].map(lin => [...lin]).reduce((a,b) => a.concat(b),[]);
    while(q_grid.length !== 0) {
        let node1 = findMin(q_grid);
        console.log(node1);
        dropNode(node1,q_grid);
        for(let next of node1.nextNodes) {
            updateDistance(node1,next);
        }
    }

    /**
     * Compute the way crossed
     */

    const way = [];
    let currentNode = endingNode;
    while (currentNode !== startingNode) {
        way.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }

    way.unshift(startingNode);
    return way.length-1;
}

function findTheMinimalPath(data) {
    const grid = data.split('\n').map(lin => lin.split('').map(el => new Node(el,false,el==='E')));
    let endingNode = null;
    let startingNodes = [];
    const minimalWays = [];

    /**
     * Build the graph
     */
    for(let i = 0; i < grid.length; ++i) {
        for(let j = 0; j < grid[i].length; ++j) {
            grid[i][j].calculateNextNode(j,i,grid);
            if (grid[i][j].value === 0) {
                startingNodes.push(grid[i][j]);
            } else if(grid[i][j].endingNode) {
                endingNode = grid[i][j];
            }
        }
    }

    for (let startingNode of startingNodes) {
        startingNode.startingNode = true;
        startingNode.distance = 0;

        /**
         * Run dijkstra to compute the distances of each vertices
         */
        const q_grid = [...grid].map(lin => [...lin]).reduce((a,b) => a.concat(b),[]);
        while(q_grid.length !== 0) {
            let node1 = findMin(q_grid);
            console.log(node1);
            dropNode(node1,q_grid);
            for(let next of node1.nextNodes) {
                updateDistance(node1,next);
            }
        }

        /**
         * Compute the way crossed
         */

        const way = [];
        let currentNode = endingNode;
        while (currentNode.value !== 0) {
            way.unshift(currentNode);
            currentNode = currentNode.previousNode;
        }

        minimalWays.push(way.length);
        startingNode.distance = Infinity;
        startingNode.startingNode = false;
    }

    return Math.min(...minimalWays);

}

console.log("ANSWER 1\n",findMinimalPath(data));

console.log("ANSWER 2\n",findTheMinimalPath(data));

//console.log(grid);