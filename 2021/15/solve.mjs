import AOCTools from "../tools/AOCTools.mjs";

async function parse(path) {
    let input = await AOCTools.parseLines(path);
    input = input.map((line, rowIdx)=>line.split('').map(char=>parseInt(char))
        .map((risk, colIdx)=>{return {
            row: rowIdx,
            col: colIdx,
            risk: risk,
            cameFrom: null,
            cost: null,
            h: null
        }})
    );
    return input;
}

function insertNode(nodeMap, node, nodeCount) {
    nodeMap[node.row] = nodeMap[node.row] || {};
    if (!nodeMap[node.row][node.col]) {
        nodeMap[node.row][node.col] = node;
        nodeCount[0]++;
    }
}

function removeNode(nodeMap, node, nodeCount) {
    if (!nodeMap[node.row]) return;
    if (nodeMap[node.row][node.col]) {
        nodeMap[node.row][node.col] = null;
        nodeCount[0]--;
    }
}

function getNeighbors(nodeMap, node) {
    let neighbors = [];
    if (nodeMap[node.row-1]) {
        if (nodeMap[node.row-1][node.col]) neighbors.push(nodeMap[node.row-1][node.col]);
    }
    if (nodeMap[node.row+1]) {
        if (nodeMap[node.row+1][node.col]) neighbors.push(nodeMap[node.row+1][node.col]);
    }
    if (nodeMap[node.row]) {
        if (nodeMap[node.row][node.col-1]) neighbors.push(nodeMap[node.row][node.col-1]);
        if (nodeMap[node.row][node.col+1]) neighbors.push(nodeMap[node.row][node.col+1]);
    }
    return neighbors;
}

function part1(input) {
    // console.log(input);
    let nodes = input;
    let startNode = input[0][0];
    let rowMax = nodes.length-1;
    let colMax = nodes[0].length-1;
    let goalNode = input[rowMax][colMax];
    let openNodes = {};
    let openNodesCount = [0];
    insertNode(openNodes, startNode, openNodesCount);
    let closedNodes = {};
    let closedNodesCount = [0];
    let nodePriority = [startNode];
    startNode.cost = 0;

    let iter = 0;
    while (openNodesCount[0] > 0) {
        // console.log(iter++, openNodesCount[0], nodePriority[0].cost);
        let current = nodePriority[0];
        if (current === goalNode) {
            console.log(current.cost);
            break;
        }
        for (let nextNode of getNeighbors(nodes, current)) {
            let newCost = current.cost + nextNode.risk;
            if (!nextNode.cost || newCost < nextNode.cost) {
                nextNode.cost = newCost;
                insertNode(openNodes, nextNode, openNodesCount);
                nodePriority.push(nextNode);
                nextNode.cameFrom = current;
                nextNode.h = Math.abs(goalNode.row-nextNode.row) + Math.abs(goalNode.col-nextNode.col);
            }
        }
        removeNode(openNodes, current, openNodesCount);
        insertNode(closedNodes, current, closedNodesCount);
        nodePriority.splice(nodePriority.indexOf(current), 1);
        nodePriority.sort((a,b)=>{
            return a.cost + a.h < b.cost + b.h ? a : b;
        });
    }
}

function part2(input) {
    // console.log(input);
    let nodes = input;
    let startNode = input[0][0];
    let rowMax = nodes.length-1;
    let colMax = nodes[0].length-1;
    console.log(nodes.length, nodes[0].length);

    for (let i=0; i <= rowMax; i++) {
        nodes[i+rowMax+1] = nodes[i].map(node=>{
            let newNode = Object.assign({}, node);
            newNode.row = i+rowMax+1;
            newNode.risk++;
            if (newNode.risk > 9) newNode.risk = 1;
            return newNode;
        });
        nodes[i+(rowMax+1)*2] = nodes[i+(rowMax+1)*1].map(node=>{
            let newNode = Object.assign({}, node);
            newNode.row = i+(rowMax+1)*2;
            newNode.risk++;
            if (newNode.risk > 9) newNode.risk = 1;
            return newNode;
        });
        nodes[i+(rowMax+1)*3] = nodes[i+(rowMax+1)*2].map(node=>{
            let newNode = Object.assign({}, node);
            newNode.row = i+(rowMax+1)*3;
            newNode.risk++;
            if (newNode.risk > 9) newNode.risk = 1;
            return newNode;
        });
        nodes[i+(rowMax+1)*4] = nodes[i+(rowMax+1)*3].map(node=>{
            let newNode = Object.assign({}, node);
            newNode.row = i+(rowMax+1)*4;
            newNode.risk++;
            if (newNode.risk > 9) newNode.risk = 1;
            return newNode;
        });
    }

    nodes = nodes.map(row=>{
        let nodes2 = row.map(node=>{
            let newNode = Object.assign({}, node);
            newNode.col = node.col+(colMax+1)*1;
            newNode.risk++;
            if (newNode.risk > 9) newNode.risk = 1;
            return newNode;
        });
        let nodes3 = nodes2.map(node=>{
            let newNode = Object.assign({}, node);
            newNode.col = node.col+(colMax+1)*1;
            newNode.risk++;
            if (newNode.risk > 9) newNode.risk = 1;
            return newNode;
        });
        let nodes4 = nodes3.map(node=>{
            let newNode = Object.assign({}, node);
            newNode.col = node.col+(colMax+1)*1;
            newNode.risk++;
            if (newNode.risk > 9) newNode.risk = 1;
            return newNode;
        });
        let nodes5 = nodes4.map(node=>{
            let newNode = Object.assign({}, node);
            newNode.col = node.col+(colMax+1)*1;
            newNode.risk++;
            if (newNode.risk > 9) newNode.risk = 1;
            return newNode;
        });
        return [...row, ...nodes2, ...nodes3, ...nodes4, ...nodes5];
    });

    // console.log(nodes.length, nodes[0].length);
    // console.log(nodes[0][0], nodes[0][100], nodes[0][200]);
    // console.log(nodes[0][0], nodes[100][0], nodes[200][0])
    // throw new Error();

    rowMax = nodes.length-1;
    colMax = nodes[0].length-1;

    let goalNode = nodes[rowMax][colMax];
    let openNodes = {};
    let openNodesCount = [0];
    insertNode(openNodes, startNode, openNodesCount);
    let closedNodes = {};
    let closedNodesCount = [0];
    let nodePriority = [startNode];
    let nodePriorityIndices = {};
    nodePriorityIndices[startNode] = 0;
    startNode.cost = 0;
    startNode.h = Math.abs(goalNode.row-startNode.row) + Math.abs(goalNode.col-startNode.col);

    let iter = 0;
    while (openNodesCount[0] > 0) {
        iter++;
        // console.log(iter++, openNodesCount[0], closedNodesCount[0], nodePriority[0].cost);
        let current = nodePriority[0];
        // console.log("checking", current);
        if (current === goalNode) {
            let riskStr = `${current.risk}`;
            let cameFrom = current.cameFrom;
            while (cameFrom && cameFrom !== startNode) {
                // console.log(riskStr);
                riskStr += `${cameFrom.risk}`;
                cameFrom = cameFrom.cameFrom;
            }
            console.log(current.cost, iter);
            // console.log(riskStr);
            break;
        }
        removeNode(openNodes, current, openNodesCount);
        insertNode(closedNodes, current, closedNodesCount);
        nodePriority.splice(nodePriority.indexOf(current), 1);
        nodePriority.sort((a,b)=>{
            return a.cost + a.h < b.cost + b.h ? -1 : a.cost + a.h === b.cost + b.h ? 0 : 1;
        });
        for (let nextNode of getNeighbors(nodes, current)) {
            // console.log("neighbor", nextNode);
            let h = (Math.abs(goalNode.row-nextNode.row) + Math.abs(goalNode.col-nextNode.col));
            let newCost = current.cost + nextNode.risk;
            if (!nextNode.cost || newCost < nextNode.cost)
            // if (!(closedNodes[nextNode.row] && closedNodes[nextNode.row][nextNode.col]) 
            // && (!nextNode.cost || newCost < nextNode.cost)) 
            {
                nextNode.cost = newCost;
                nextNode.cameFrom = current;
                nextNode.h = h;
                if (!openNodes[nextNode.row] || !openNodes[nextNode.row][nextNode.col]) {
                    insertNode(openNodes, nextNode, openNodesCount);
                    nodePriority.push(nextNode);
                }
            }
            // if (!nextNode.cost || newCost < nextNode.cost)
            // {
            //     nextNode.cost = newCost;
            //     nextNode.cameFrom = current;
            //     nextNode.h = h;
            // }
            // if (!(closedNodes[nextNode.row] && closedNodes[nextNode.row][nextNode.col])) {
            //     insertNode(openNodes, nextNode, openNodesCount);
            //     nodePriority.push(nextNode);
            // }
        }
    }
}

try {
    let input = await parse('input');
    // let input = await parse('test');
    // part1(input);
    part2(input);
}
catch (e) {
    if (e instanceof AOCTools.SolutionFound) {}
    else throw e;
}