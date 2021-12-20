import AOCTools from "../tools/AOCTools.mjs";

async function parse(path) {
    let input = await AOCTools.parseLines(path);
    input = input.map(line=>line.split(' | '));
    input.forEach(line=>{
        line[0] = line[0].split(' ');
        line[1] = line[1].split(' ');
    });
    input = input.map(line=>{
        return {
            samples: line[0].map(e=>{return {
                digit: new Digit(e),
                possibleVals: []
            }}),
            digitsByVal: [],
            out: line[1].map(e=>{return {
                digit: new Digit(e),
                possibleVals: []
            }})
        }
    })
    return input;
}

class Digit {
    segStr;
    segs = {a:false, b:false, c:false, d:false, e:false, f:false, g:false};
    possibleDigitVals = [];
    intVal;

    constructor(segStr) {
        this.segStr = segStr;
        for (let char of [...segStr]) {
            this.segs[char] = true;
        }
    }

    numSegs() {
        return this.segStr.length;
    }

    hasSegsStr(segStr) {
        return this.hasSegs([...segStr]);
    }

    hasSegs(segs) {
        return segs.reduce((prev, cur)=>this.segs[cur] && prev, true);
    }

    isValid() {
        return this.toInt() !== null;
    }

    toInt() {
        if (this.numSegs() === 2 && this.hasSegsStr("cf")) return 1;
        if (this.numSegs() === 3 && this.hasSegsStr("acf")) return 7;
        if (this.numSegs() === 4 && this.hasSegsStr("bcdf")) return 4;
        if (this.numSegs() === 5) {
            if (this.hasSegsStr("abdfg")) return 5;
            else if (this.hasSegsStr("acdeg")) return 2;
            else if (this.hasSegsStr("acdfg")) return 3;

            else return null;
        }
        if (this.numSegs() === 6) {
            if (this.hasSegsStr("abdefg")) return 6;
            else if (this.hasSegsStr("abcdfg")) return 9;
            else if (this.hasSegsStr("abcefg")) return 0;
            else return null;
        }
        if (this.numSegs() === 7 && this.hasSegsStr("abcdefg")) return 8;
        return null;
    }

    transform(transformMap) {
        let newSegs = {a:false, b:false, c:false, d:false, e:false, f:false};
        for (segkey in this.segs) {
            if (this.segs[segKey]) {
                newSegs[transformMap[segKey]] = true;
            }
        }
        this.segs = newSegs;
    }

    toString() {
        
    }
}

function part1(input) {
    let cnt = 0;
    input.forEach(set=>{
        set.out.forEach(segDisp=>{
            if ([2, 4, 3, 7].includes(segDisp.digit.numSegs())) cnt++;
        })
    })
    console.log(cnt);
}

function part2(input) {
    // console.log(input);
    let outValSum = 0;
    input.forEach(digitSet=>{
        digitSet.samples.forEach(sample=>{
            if (sample.digit.numSegs() === 2) {
                sample.possibleVals.push(1);
                digitSet.digitsByVal[1] = sample.digit;
                sample.digit.intVal = 1;
            }
            else if (sample.digit.numSegs() === 3) {
                sample.possibleVals.push(7);
                digitSet.digitsByVal[7] = sample.digit;
                sample.digit.intVal = 7;
            }
            else if (sample.digit.numSegs() === 4) {
                sample.possibleVals.push(4);
                digitSet.digitsByVal[4] = sample.digit;
                sample.digit.intVal = 4;
            }
            else if (sample.digit.numSegs() === 5) {
                sample.possibleVals.push(2);
                sample.possibleVals.push(3);
                sample.possibleVals.push(5);
            }
            else if (sample.digit.numSegs() === 6) {
                sample.possibleVals.push(0);
                sample.possibleVals.push(6);
                sample.possibleVals.push(9);
            }
            else if (sample.digit.numSegs() === 7) {
                sample.possibleVals.push(8);
                digitSet.digitsByVal[8] = sample.digit;
                sample.digit.intVal = 8;
            }
        })
        digitSet.samples.forEach(sample=>{
            if (sample.possibleVals.includes(3)) {
                if (sample.digit.hasSegsStr(digitSet.digitsByVal[1].segStr)) {
                    sample.possibleVals = [3];
                    digitSet.digitsByVal[3] = sample.digit;
                    sample.digit.intVal = 3;
                }
                else if (sample.digit.hasSegsStr(fourDiff(digitSet.digitsByVal[4].segStr, digitSet.digitsByVal[1].segStr))) {
                    sample.possibleVals = [5];
                    digitSet.digitsByVal[5] = sample.digit;
                    sample.digit.intVal = 5;
                }
                else {
                    sample.possibleVals = [2];
                    digitSet.digitsByVal[2] = sample.digit;
                    sample.digit.intVal = 2;
                }
            }
            if (sample.possibleVals.includes(0)) {
                if (sample.digit.hasSegsStr(digitSet.digitsByVal[4].segStr)) {
                    sample.possibleVals = [9];
                    digitSet.digitsByVal[9] = sample.digit;
                    sample.digit.intVal = 9;
                }
                else if (sample.digit.hasSegsStr(fourDiff(digitSet.digitsByVal[4].segStr, digitSet.digitsByVal[1].segStr))) {
                    sample.possibleVals = [6];
                    digitSet.digitsByVal[6] = sample.digit;
                    sample.digit.intVal = 6;
                }
                else {
                    sample.possibleVals = [0];
                    digitSet.digitsByVal[0] = sample.digit;
                    sample.digit.intVal = 0;
                }
            }
        })
        digitSet.out.forEach(out=>{
            digitSet.samples.forEach(sample=>{
                if (out.digit.numSegs() === sample.digit.numSegs() && out.digit.hasSegsStr(sample.digit.segStr)) {
                    out.digit.intVal = sample.digit.intVal;
                    return;
                }
            });
        })
        let outStr = "";
        // console.log(digitSet.out);
        digitSet.out.forEach(e=>{
            outStr += e.digit.intVal.toString();
        });
        let outVal = parseInt(outStr);
        outValSum += outVal;
    });
    // console.log("first row", input[0].out);
    console.log(outValSum);
}

function fourDiff(fourStr, oneStr) {
    return fourStr.replace([...oneStr][0], '').replace([...oneStr][1], '');
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