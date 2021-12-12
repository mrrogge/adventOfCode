import AOCTools from "../tools/AOCTools.mjs";

async function parse(path) {
    let input = await AOCTools.parseLines(path);
    // let input = await AOCTools.parseSectionsOfLines(path);
    input = input.map(row=>[...row].map(col=>parseInt(col)));
    // input = input[0].split(',').map(e=>parseInt(e));
    // input = input.map(line=>line.split(''));
    return input;
}

function part1(input) {
    // console.log(input);
    let flashes = 0;
    let prev = input;
    for (let i=0; i < 100; i++) {
        // console.log('===', i, '===');
        // console.log(prev);
        let next = [];
        prev.forEach((row, rowIdx)=>{
            next[rowIdx] = next[rowIdx] || [];
            row.forEach((col, colIdx)=>{
                // console.log(rowIdx, colIdx);
                if (prev[rowIdx][colIdx] > 9) prev[rowIdx][colIdx] = 0;
                else prev[rowIdx][colIdx]++;
            });
        });
        let newFlashes = 0;
        do {
            newFlashes = 0;
            prev.forEach((row, rowIdx)=>{
                row.forEach((col, colIdx)=>{
                    if (prev[rowIdx][colIdx] > 9) {
                        //flashed
                        flashes++;
                        newFlashes++;
                        prev[rowIdx][colIdx] = 0;
                        if (colIdx > 0 && prev[rowIdx][colIdx-1] !== 0) prev[rowIdx][colIdx-1]++;
                        if (colIdx < row.length-1 && prev[rowIdx][colIdx+1] !== 0) prev[rowIdx][colIdx+1]++;
                        if (rowIdx > 0 && prev[rowIdx-1][colIdx] !== 0) prev[rowIdx-1][colIdx]++;
                        if (rowIdx < prev.length-1 && prev[rowIdx+1][colIdx] !== 0) prev[rowIdx+1][colIdx]++;
                        if (rowIdx > 0 && colIdx > 0 && prev[rowIdx-1][colIdx-1] !== 0) prev[rowIdx-1][colIdx-1]++;
                        if (rowIdx > 0 && colIdx < row.length-1 && prev[rowIdx-1][colIdx+1] !== 0) prev[rowIdx-1][colIdx+1]++;
                        if (rowIdx < prev.length-1 && colIdx > 0 && prev[rowIdx+1][colIdx-1] !== 0) prev[rowIdx+1][colIdx-1]++;
                        if (rowIdx < prev.length-1 && colIdx < row.length-1 && prev[rowIdx+1][colIdx+1] !== 0) prev[rowIdx+1][colIdx+1]++;
                    }
                });
            });
        } while (newFlashes > 0);
    }
    console.log(flashes);
}

//this doesn't work for some reason, not sure why
function advance(prev) {
    let flashes = 0;
    let next = [];
    prev.forEach((row, rowIdx)=>{
        next[rowIdx] = next[rowIdx] || [];
        row.forEach((col, colIdx)=>{
            // console.log(rowIdx, colIdx);
            if (prev[rowIdx][colIdx] > 9) prev[rowIdx][colIdx] = 0;
            else prev[rowIdx][colIdx]++;
        });
    });
    let newFlashes = 0;
    do {
        newFlashes = 0;
        prev.forEach((row, rowIdx)=>{
            row.forEach((col, colIdx)=>{
                if (prev[rowIdx][colIdx] > 9) {
                    //flashed
                    flashes++;
                    newFlashes++;
                    prev[rowIdx][colIdx] = 0;
                    if (colIdx > 0 && prev[rowIdx][colIdx-1] !== 0) prev[rowIdx][colIdx-1]++;
                    if (colIdx < row.length-1 && prev[rowIdx][colIdx+1] !== 0) prev[rowIdx][colIdx+1]++;
                    if (rowIdx > 0 && prev[rowIdx-1][colIdx] !== 0) prev[rowIdx-1][colIdx]++;
                    if (rowIdx < prev.length-1 && prev[rowIdx+1][colIdx] !== 0) prev[rowIdx+1][colIdx]++;
                    if (rowIdx > 0 && colIdx > 0 && prev[rowIdx-1][colIdx-1] !== 0) prev[rowIdx-1][colIdx-1]++;
                    if (rowIdx > 0 && colIdx < row.length-1 && prev[rowIdx-1][colIdx+1] !== 0) prev[rowIdx-1][colIdx+1]++;
                    if (rowIdx < prev.length-1 && colIdx > 0 && prev[rowIdx+1][colIdx-1] !== 0) prev[rowIdx+1][colIdx-1]++;
                    if (rowIdx < prev.length-1 && colIdx < row.length-1 && prev[rowIdx+1][colIdx+1] !== 0) prev[rowIdx+1][colIdx+1]++;
                }
            });
        });
    } while (newFlashes > 0);
    return flashes;
}

function part2(input) {
    let i=0;
    let flashes = 0;
    let prev = input;
    while (true) {
        i++;
        
        let next = [];
        
        prev.forEach((row, rowIdx)=>{
            next[rowIdx] = next[rowIdx] || [];
            row.forEach((col, colIdx)=>{
                // console.log(rowIdx, colIdx);
                if (prev[rowIdx][colIdx] > 9) prev[rowIdx][colIdx] = 0;
                else prev[rowIdx][colIdx]++;
            });
        });
        let newFlashes = 0;
        do {
            newFlashes = 0;
            prev.forEach((row, rowIdx)=>{
                row.forEach((col, colIdx)=>{
                    if (prev[rowIdx][colIdx] > 9) {
                        //flashed
                        flashes++;
                        newFlashes++;
                        prev[rowIdx][colIdx] = 0;
                        if (colIdx > 0 && prev[rowIdx][colIdx-1] !== 0) prev[rowIdx][colIdx-1]++;
                        if (colIdx < row.length-1 && prev[rowIdx][colIdx+1] !== 0) prev[rowIdx][colIdx+1]++;
                        if (rowIdx > 0 && prev[rowIdx-1][colIdx] !== 0) prev[rowIdx-1][colIdx]++;
                        if (rowIdx < prev.length-1 && prev[rowIdx+1][colIdx] !== 0) prev[rowIdx+1][colIdx]++;
                        if (rowIdx > 0 && colIdx > 0 && prev[rowIdx-1][colIdx-1] !== 0) prev[rowIdx-1][colIdx-1]++;
                        if (rowIdx > 0 && colIdx < row.length-1 && prev[rowIdx-1][colIdx+1] !== 0) prev[rowIdx-1][colIdx+1]++;
                        if (rowIdx < prev.length-1 && colIdx > 0 && prev[rowIdx+1][colIdx-1] !== 0) prev[rowIdx+1][colIdx-1]++;
                        if (rowIdx < prev.length-1 && colIdx < row.length-1 && prev[rowIdx+1][colIdx+1] !== 0) prev[rowIdx+1][colIdx+1]++;
                    }
                });
            });
        } while (newFlashes > 0);


        let notAllFlashed = false;
        for (let row of input) {
            console.log(row);
            for (let col of row) {
                // console.log(col);
                if (col !== 0) {
                    notAllFlashed = true;
                    break;
                }
            }
            if (notAllFlashed) break;
        }
        if (notAllFlashed) continue;
        console.log(i);
        break;
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