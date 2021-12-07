import AOCTools from "../tools/AOCTools.mjs";

let input = await AOCTools.parseSectionsOfLines('input');
// let input = await AOCTools.parseSectionsOfLines('test');
// console.log(input);
let moves = input[0][0].split(',').map(e=>parseInt(e));
let boards = input.slice(1);
boards = boards.map(e=>e.map(e=>e.split(/[ ]+/).map(e=>parseInt(e)).filter(e=>!isNaN(e))))
boards = boards.map(board=>board.map(row=>row.map(col=>{return {num:col, hit:false}})))

// boards = boards.slice(0,5);
function part1() {
    try {
        moves.forEach(move=>{
            boards.forEach((board,boardIdx)=>board.forEach(row=>row.forEach(col=>{
                if (col.num === move) {
                    col.hit = true;
                }
            })));
            // console.log(boards[0])
            boards.forEach((board,boardIdx)=>{
                //check rows
                board.forEach(row=>{
                    let foundWin = row.map(col=>col.hit).reduce((prev,e)=>prev && e)
                    if (foundWin) {
                        console.log('win', boardIdx);
                        getScore(board, move);
                        throw new AOCTools.SolutionFound();
                    }
                })
                //check cols
                for (let colIdx=0; colIdx < board[0].length; colIdx++) {
                    let foundWin = board.map(row=>row[colIdx].hit).reduce((prev,cur)=>prev && cur)
                    if (foundWin) {
                        console.log('win', boardIdx);
                        getScore(board, move);
                        throw new AOCTools.SolutionFound();
                    }
                }
            });
        });
    }
    catch (e) {
        if (e instanceof AOCTools.SolutionFound) {}
        else throw e;
    }
}

function getScore(board, move) {
    console.log(board.map(row=>row.map(col=>col.num)));
    let sum = board.reduce((prevRow, curRow)=>{
        return prevRow + curRow.reduce((prevCol, curCol)=>{
            if (curCol.hit) return prevCol; else return prevCol + curCol.num;
        }, 0);
    }, 0);
    console.log(sum, move, sum*move);
}


// boards.forEach(board=>board.forEach(row=>row.forEach(col=>col.hit=false)));

function part2() {
    try {
        let boardWinCnt = 0;
        let boardsWon = {};
        moves.forEach(move=>{
            boards.forEach((board,boardIdx)=>board.forEach(row=>row.forEach(col=>{
                if (boardsWon[boardIdx]) return;
                if (col.num === move) {
                    col.hit = true;
                }
            })));
            // console.log(boards[0])
            boards.forEach((board,boardIdx)=>{
                if (boardsWon[boardIdx]) return;
                let foundWin = false;
                //check rows
                board.forEach(row=>{
                    if (row.map(col=>col.hit).reduce((prev,e)=>prev && e)) foundWin = true;
                })
                //check cols
                for (let colIdx=0; colIdx < board[0].length; colIdx++) {
                    if (board.map(row=>row[colIdx].hit).reduce((prev,cur)=>prev && cur)) foundWin = true;
                }
                if (foundWin) {
                    boardsWon[boardIdx] = true;
                    boardWinCnt++;
                    console.log('win', boardIdx, boardWinCnt, boards.length);
                    if (boardWinCnt >= boards.length) {
                        getScore(board, move);
                        throw new AOCTools.SolutionFound();
                    }
                }
            });
        });
    }
    catch (e) {
        if (e instanceof AOCTools.SolutionFound) {}
        else throw e;
    }
}

part1();
part2();