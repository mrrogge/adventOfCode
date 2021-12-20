import AOCTools from "../tools/AOCTools.mjs";

async function parse(path) {
    let input = await AOCTools.parseLines(path);
    input = input.map(line=>line.split('-'))
    // let input = await AOCTools.parseSectionsOfLines(path);
    // input = input.map(row=>[...row].map(col=>parseInt(col)));
    // input = input[0].split(',').map(e=>parseInt(e));
    // input = input.map(line=>line.split(''));
    return input;
}

function part1(input) {
    // console.log(input);
    let branches = input;
    let branchMap = {};
    branches.forEach(branch=>{
        branchMap[branch[0]] = branchMap[branch[0]] || {};
        branchMap[branch[0]][branch[1]] = true;
        branchMap[branch[1]] = branchMap[branch[1]] || {};
        branchMap[branch[1]][branch[0]] = true;
    });
    // console.log(branchMap);
    let nodes = {};
    branches.forEach(path=>{
        nodes[path[0]] = true;
        nodes[path[1]] = true;
    });

    function explore(node, prevNode, nodeCounts, pathCount) {
        console.log(node, prevNode, nodeCounts, pathCount[0]);
        for (let nextNode of Object.keys(branchMap[node])) {
            console.log('nextNode', nextNode);
            if (nextNode === 'end') {
                pathCount[0]++;
                console.log('end', pathCount);
                continue;
            }
            if (nextNode.toLowerCase() === nextNode) {
                if (nodeCounts[nextNode] > 0) {
                    //can't visit small cave more than once
                    console.log("can't visit small cave more than once");
                    continue;
                }
                else {
                    let newNodeCounts = Object.assign({}, nodeCounts);
                    newNodeCounts[nextNode]++;
                    explore(nextNode, node, newNodeCounts, pathCount);
                }
            }
            else {
                if (nextNode === prevNode) {
                    //shouldn't loop directly back to prev node
                    // console.log('loop back');
                    // continue;
                }
                let newNodeCounts = Object.assign({}, nodeCounts);
                newNodeCounts[nextNode]++;
                explore(nextNode, node, nodeCounts, pathCount);
            }
        }
    }

    let pathCount = [0];
    let nodeCounts = {};
    Object.keys(nodes).forEach(key=>{
        nodeCounts[key] = 0;
    });
    nodeCounts.start = 1;
    explore("start", null, nodeCounts, pathCount);
    console.log(pathCount);
}

function part2(input) {
    // console.log(input);
    let branches = input;
    let branchMap = {};
    branches.forEach(branch=>{
        branchMap[branch[0]] = branchMap[branch[0]] || {};
        branchMap[branch[0]][branch[1]] = true;
        branchMap[branch[1]] = branchMap[branch[1]] || {};
        branchMap[branch[1]][branch[0]] = true;
    });
    // console.log(branchMap);
    let nodes = {};
    branches.forEach(path=>{
        nodes[path[0]] = true;
        nodes[path[1]] = true;
    });

    function explore(node, prevNode, nodeCounts, pathCount, smallCaveTwiceFlag) {
        // console.log(node, prevNode, nodeCounts, pathCount[0], smallCaveTwiceFlag);
        for (let nextNode of Object.keys(branchMap[node])) {
            // console.log('nextNode', nextNode);
            if (nextNode === 'end') {
                pathCount[0]++;
                // console.log('end', pathCount);
                continue;
            }
            if (nextNode.toLowerCase() === nextNode) {
                if (nodeCounts[nextNode] > 0) {
                    if (["start", "end"].includes(nextNode)) {
                        //start and end can only be visited once
                        continue;
                    } 
                    if (smallCaveTwiceFlag) {
                        //if one small cave has visited twice already, can't visit another more than once
                        continue;
                    }
                    else {
                        //this cave can be visited a 2nd time, but no more
                        let newNodeCounts = Object.assign({}, nodeCounts);
                        newNodeCounts[nextNode]++;
                        explore(nextNode, node, newNodeCounts, pathCount, true);
                    }
                }
                else {
                    let newNodeCounts = Object.assign({}, nodeCounts);
                    newNodeCounts[nextNode]++;
                    explore(nextNode, node, newNodeCounts, pathCount, smallCaveTwiceFlag);
                }
            }
            else {
                if (nextNode === prevNode) {
                    //shouldn't loop directly back to prev node
                    // console.log('loop back');
                    // continue;
                }
                let newNodeCounts = Object.assign({}, nodeCounts);
                newNodeCounts[nextNode]++;
                explore(nextNode, node, nodeCounts, pathCount, smallCaveTwiceFlag);
            }
        }
    }

    let pathCount = [0];
    let nodeCounts = {};
    Object.keys(nodes).forEach(key=>{
        nodeCounts[key] = 0;
    });
    nodeCounts.start = 1;
    explore("start", null, nodeCounts, pathCount, false);
    console.log(pathCount);
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