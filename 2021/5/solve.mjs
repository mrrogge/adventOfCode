import AOCTools from "../tools/AOCTools.mjs";

async function parse(path) {
    let input = await AOCTools.parseLines(path);
    input = input.map(line=>line.split(' -> '))
    .map(pair=>pair.map(pointStr=>pointStr.split(',').map(pointPart=>parseInt(pointPart))));
    input = input.map(line=>{return {x1:line[0][0], y1:line[0][1], x2:line[1][0], y2:line[1][1]}});
    return input;
}

function part1(input) {
    let grid = [[]];
    input.forEach(line=>{
        if (line.x1 === line.x2 || line.y1 === line.y2) {
            let minX = Math.min(line.x1, line.x2);
            let maxX = Math.max(line.x1, line.x2);
            let minY = Math.min(line.y1, line.y2);
            let maxY = Math.max(line.y1, line.y2);
            for (let row=minY; row <= maxY; row++) {
                for (let col=minX; col <= maxX; col++) {
                    if (grid[row] == null) grid[row] = [];
                    if (grid[row][col] == null) grid[row][col] = 0;
                    grid[row][col]++;
                }
            }
        }
    });
    let cnt = 0;
    grid.forEach((row, rowIdx)=>row.forEach((col, colIdx)=>{
        if (col >= 2) cnt++;
    }));
    console.log(cnt);
    console.log(grid);
}

function part2(input) {
    let grid = [[]];
    for (let i=0; i<10; i++) {
        grid[i] = [];
        for (let j=0; j<10; j++) {
            grid[i][j] = 0;
        }
    }
    input.forEach(line=>{
        let minX = Math.min(line.x1, line.x2);
        let maxX = Math.max(line.x1, line.x2);
        let minY = Math.min(line.y1, line.y2);
        let maxY = Math.max(line.y1, line.y2);
        let dia = minX !== maxX && minY !== maxY;
        // console.log(line, dia);
        if (!dia) {
            // console.log(line);
            for (let row=minY; row <= maxY; row++) {
                for (let col=minX; col <= maxX; col++) {
                    if (grid[row] == null) grid[row] = [];
                    if (grid[row][col] == null) grid[row][col] = 0;
                    grid[row][col]++;
                }
            }
        }
        else {
            let dirX = Math.sign(line.x2 - line.x1);
            let dirY = Math.sign(line.y2 - line.y1);
            let x = line.x1;
            let y = line.y1;
            // console.log(line, dirX, dirY);
            while (true) {
                if (grid[y] == null) grid[y] = [];
                if (grid[y][x] == null) grid[y][x] = 0;
                grid[y][x]++;
                // console.log(y, x);
                if (x === line.x2 && y === line.y2) break;
                x += dirX;
                y += dirY;
            }
        }
        // console.log(grid);
    });
    let cnt = 0;
    grid.forEach((row, rowIdx)=>row.forEach((col, colIdx)=>{
        if (col >= 2) cnt++;
    }));
    // for (let i=0; i < grid.length; i++) {
    //     if (grid[i] == null) grid[i] = [];
    //     for (let j=0; j < grid[i].length; j++) {
    //         if (grid[i][j] == null) grid[i][j] = 0;
    //     }
    // }
    console.log(cnt);
    // printGrid(grid);
}

function printGrid(grid) {
    let gridStr = grid.map(row=>row.map(col=>toString(col))).map(row=>row.reduce((prev,cur)=>prev+cur, ""))
    console.log(gridStr);
}

try {
    let input = await parse('input');
    part1(input);
    part2(input);
}
catch (e) {
    if (e instanceof AOCTools.SolutionFound) {}
    else throw e;
}