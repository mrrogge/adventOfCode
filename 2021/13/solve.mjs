import AOCTools from "../tools/AOCTools.mjs";
import * as fs from "fs/promises";

async function parse(path) {
    let input = await AOCTools.parseSectionsOfLines(path);
    let dots = input[0].map(line=>line.split(',')).map(line=>{return {x:parseInt(line[0]), y:parseInt(line[1])}});
    let folds = input[1].map(line=>line.split(' ')[2].split('=')).map(line=>{return{
        axis:line[0],
        idx:parseInt(line[1])
    }});
    input = {
        dots:dots,
        folds:folds
    }
    return input;
}

function part1(input) {
    let grid = [];
    input.dots.forEach(dot=>{
        grid[dot.y] = grid[dot.y] || [];
        grid[dot.y][dot.x] = true;
    });
    let rowMax = grid.length;
    let colMax = grid.reduce((prev, cur)=>Math.max(cur.length, prev), 0);
    for (let i=0; i < rowMax; i++) {
        grid[i] = grid[i] || [];
        for (let j=0; j < colMax; j++) {
            grid[i][j] = grid[i][j] || false;
        }
    }
    grid = fold(grid, input.folds[0].axis, input.folds[0].idx);
    // console.log(grid);
    let count = 0;
    grid.forEach(row=>row.forEach(col=>col ? count++ : null));
    console.log(count);
}

function fold(grid, axis, foldIdx) {
    console.log(axis, foldIdx);
    if (axis === 'y') {
        let topGrid = [...grid].map(row=>[...row]).slice(0, foldIdx);
        let bottomGrid = [...grid].map(row=>[...row]).slice(foldIdx+1);
        let bottomGridFlipped = [];
        bottomGrid.forEach((row, rowIdx)=>row.forEach((col, colIdx)=>{
            bottomGridFlipped[bottomGrid.length-1-rowIdx] = bottomGridFlipped[bottomGrid.length-1-rowIdx] || [];
            bottomGridFlipped[bottomGrid.length-1-rowIdx][colIdx] = col;
        }));        
        let foldedGrid = [];
        // console.log(topGrid.length, bottomGrid.length)
        let bottomGridOffset = topGrid.length-bottomGrid.length;
        topGrid.forEach((row, rowIdx)=>row.forEach((col, colIdx)=>{
            // console.log(rowIdx, colIdx);
            foldedGrid[rowIdx] = foldedGrid[rowIdx] || [];
            foldedGrid[rowIdx][colIdx] = topGrid[rowIdx][colIdx];
            if (rowIdx-bottomGridOffset >= 0) {
                foldedGrid[rowIdx][colIdx] = foldedGrid[rowIdx][colIdx] || bottomGridFlipped[rowIdx-bottomGridOffset][colIdx];
            }
        }));
        // console.log(foldedGrid[0]);
        return foldedGrid;
    }
    else if (axis === 'x') {
        let leftGrid = [...grid].map(row=>[...row].slice(0, foldIdx));
        let rightGrid = [...grid].map(row=>[...row].slice(foldIdx+1));
        let rightGridFlipped = [];
        rightGrid.forEach((row, rowIdx)=>row.forEach((col, colIdx)=>{
            rightGridFlipped[rowIdx] = rightGridFlipped[rowIdx] || [];
            rightGridFlipped[rowIdx][row.length-1-colIdx] = col;
        }));        
        let foldedGrid = [];
        let rightGridOffset = leftGrid.length-rightGrid.length;
        leftGrid.forEach((row, rowIdx)=>row.forEach((col, colIdx)=>{
            foldedGrid[rowIdx] = foldedGrid[rowIdx] || [];
            foldedGrid[rowIdx][colIdx] = leftGrid[rowIdx][colIdx];
            if (colIdx-rightGridOffset >= 0) {
                foldedGrid[rowIdx][colIdx] = foldedGrid[rowIdx][colIdx] || rightGridFlipped[rowIdx][colIdx-rightGridOffset];
            }
        }));
        // console.log(foldedGrid[0]);
        return foldedGrid;
    }
    else throw new Error();
}



function part2(input) {
    let grid = [];
    input.dots.forEach(dot=>{
        grid[dot.y] = grid[dot.y] || [];
        grid[dot.y][dot.x] = true;
    });
    let rowMax = grid.length;
    let colMax = grid.reduce((prev, cur)=>Math.max(cur.length, prev), 0);
    for (let i=0; i < rowMax; i++) {
        grid[i] = grid[i] || [];
        for (let j=0; j < colMax; j++) {
            grid[i][j] = grid[i][j] || false;
        }
    }
    for (let foldInst of input.folds) {
        grid = fold(grid, foldInst.axis, foldInst.idx);
    }
    // grid = input.folds.reduce((prev, cur)=>fold(prev, cur.axis, cur.idx), grid);
    gridOut(grid);
}

async function gridOut(grid) {
    let gridStr = grid.map(row=>row.map(col=>col ? "#" : ".").join("")).join("\n");
    fs.writeFile("grid.txt", gridStr);
}

try {
    let input = await parse('input');
    // let input = await parse('test');
    // console.log(input);
    // part1(input);
    part2(input);
}
catch (e) {
    if (e instanceof AOCTools.SolutionFound) {}
    else throw e;
}