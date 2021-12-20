import AOCTools from "../tools/AOCTools.mjs";

async function parse(path) {
    let input = await AOCTools.parseLines(path);
    input = input.map(e=>e.split(''));
    input = input.map(line=>line.map(e=>parseInt(e)));
    return input;
}

function part1(input) {
    // console.log(input);
    let lowPointRisks = [];
    // console.log(input.length);
    for (let row=0; row < input.length; row++) {
        for (let col=0; col < input[row].length; col++) {
            let height = input[row][col];
            // console.log(height, row, col);
            if (row === 0 && col === 0) {
                if (height < input[row+1][col] && height < input[row][col+1]) {
                    lowPointRisks.push(height+1);
                }
            }
            else if (row === 0 && col === input[row].length-1) {
                console.log(height, input[row][col-1], input[row+1][col]);
                if (height < input[row][col-1] && height < input[row+1][col]) {
                    lowPointRisks.push(height+1);
                }
            }
            else if (row === 0) {
                if (height < input[row][col-1] && height < input[row][col+1] && height < input[row+1][col]) {
                    lowPointRisks.push(height+1);
                }
            }
            else if (row === input.length-1 && col === 0) {
                if (height < input[row][col+1] && height < input[row-1][col]) lowPointRisks.push(height+1);
            }
            else if (row === input.length-1 && col === input[row].length-1) {
                if (height < input[row][col-1] && height < input[row-1][col]) lowPointRisks.push(height+1);
            }
            else if (row === input.length-1) {
                if (height < input[row][col-1] && height < input[row][col+1] && height < input[row-1][col]) {
                    lowPointRisks.push(height+1);
                }
            }
            else if (col === 0) {
                if (height < input[row-1][col] && height < input[row+1][col] && height < input[row][col+1]) {
                    lowPointRisks.push(height+1);
                }
            }
            else if (col === input[row].length-1) {
                if (height < input[row-1][col] && height < input[row+1][col] && height < input[row][col-1]) {
                    lowPointRisks.push(height+1);
                }
            }
            else {
                if (height < input[row-1][col] && height < input[row+1][col] && height < input[row][col-1] && height < input[row][col+1]) {
                    lowPointRisks.push(height+1);
                }
            }
        }
    }
    console.log(lowPointRisks);
    console.log(lowPointRisks.reduce((prev, cur)=>prev+cur, 0));
}

function isLowPoint(input, row, col) {
    let height = input[row][col].height;
    if (row === 0 && col === 0) {
        if (height < input[row+1][col].height && height < input[row][col+1].height) {
            return true;
        }
    }
    else if (row === 0 && col === input[row].length-1) {
        // console.log(height, input[row][col-1].height, input[row+1][col]);
        if (height < input[row][col-1].height && height < input[row+1][col].height) {
            return true;
        }
    }
    else if (row === 0) {
        if (height < input[row][col-1].height && height < input[row][col+1].height && height < input[row+1][col].height) {
            return true;
        }
    }
    else if (row === input.length-1 && col === 0) {
        if (height < input[row][col+1].height && height < input[row-1][col].height) return true;
    }
    else if (row === input.length-1 && col === input[row].length-1) {
        if (height < input[row][col-1].height && height < input[row-1][col].height) return true;
    }
    else if (row === input.length-1) {
        if (height < input[row][col-1].height && height < input[row][col+1].height && height < input[row-1][col].height) {
            return true;
        }
    }
    else if (col === 0) {
        if (height < input[row-1][col].height && height < input[row+1][col].height && height < input[row][col+1].height) {
            return true;
        }
    }
    else if (col === input[row].length-1) {
        if (height < input[row-1][col].height && height < input[row+1][col].height && height < input[row][col-1].height) {
            return true;
        }
    }
    else {
        if (height < input[row-1][col].height && height < input[row+1][col].height && height < input[row][col-1].height && height < input[row][col+1].height) {
            return true;
        }
    }
    return false;
}

function getBasinCount(input, row, col) {
    let cnt = 0;
    if (input[row][col].height === 9) return cnt;
    if (input[row][col].checked) return cnt;
    cnt++;
    input[row][col].checked = true;
    // let height = input[row][col].height;
    if (row > 0) {
        cnt += getBasinCount(input, row-1, col);
    }
    if (row < input.length-1) {
        cnt += getBasinCount(input, row+1, col);
    }
    if (col > 0) {
        cnt += getBasinCount(input, row, col-1);
    }
    if (col < input[row].length-1) {
        cnt += getBasinCount(input, row, col+1);
    }
    return cnt;
}

function part2(input) {
    let basins = [];
    input = input.map(row=>{
        return row.map(col=>{return {
            height: col,
            checked: false
        }})
    });
    for (let row=0; row < input.length; row++) {
        for (let col=0; col < input[row].length; col++) {
            // console.log(row, col);
            if (input[row][col].checked) continue;
            if (isLowPoint(input, row, col)) {
                // console.log('LP', row, col);
                let basinCount = getBasinCount(input, row, col);
                basins.push(basinCount);
            }
        }
    }
    basins.sort((b,a)=>a<b ? -1 : a===b ? 0 : 1);
    console.log(basins.slice(0,3).reduce((prev, cur)=>prev*cur, 1));
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