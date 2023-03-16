const fs = require('fs');
const data = fs.readFileSync('./input', 'utf8');

class file {
    constructor(parent="",name,content,size=0) {
        this.parent = parent;
        this.name = name;
        this.sons = content;
        this.size = size;
    }

    findSon(sonName) {
        for (let son of this.sons) {
            if (son.name === sonName) {
                return son;
            }
        }
    }

    appendSon(son) {
        this.sons.push(son);
    }

    computeSize() {
        if (this.sons.length === 0) {
            return this.size;
        } else {
            this.size = this.sons.map(f => f.computeSize()).reduce((a,b) => a+b, 0);
            return this.sons.map(f => f.computeSize()).reduce((a,b) => a+b, 0);
        }
    }
}

const lines = data.split("\n");
let tree = null;
let cur_dir = null;
let ls_mode = false;
const node_list = [];

for (let line of lines) {
    if (line.match(/\$ cd/g)) {
        ls_mode = false;
        let dir_name = line.replace("$ cd ","");
        switch(dir_name) {
            case "/": {
                tree = new file(null,dir_name,[]);
                cur_dir = tree;
                break;
            }
            case "..": {
                cur_dir = cur_dir.parent;
                break;
            }
            default: {
                cur_dir = cur_dir.findSon(dir_name);
            }
        }
    } else if (line.match(/\$ ls/g)) {
        ls_mode = true;
    } else {
        if(line.match(/dir/g)) {
            let new_node = new file(cur_dir,line.replace("dir ",""),[]);
            cur_dir.appendSon(new_node);
        } else {
            let new_leaf = new file(cur_dir,line.replace(/[0-9]* /,""),[],parseInt(line.match(/[0-9]*/g)));
            cur_dir.appendSon(new_leaf);
        }
    }
}

tree.computeSize();
listNodes(tree);
let node_sum = 0;
node_sum = node_list.filter(node => (node.size <= 100000 && node.sons.length !== 0)).reduce((acc,node) => acc + node.size,0);

let wipe_node = 0;
const dir_list = node_list.filter(node => node.sons.length > 0).sort((a,b) => a.size - b.size);
const space_available = 70000000 - tree.size;
for (let dir of dir_list) {
    if (dir.size+space_available > 30000000) {
        wipe_node = dir.size;
        break;
    }
}



console.log("ANSWER 1\n",node_sum);
console.log("ANSWER 2\n",wipe_node);

function listNodes(node) {
    node_list.push(node);
    for(let child of node.sons) {
        listNodes(child);
    }
}