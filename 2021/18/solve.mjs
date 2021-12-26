import AOCTools from "../tools/AOCTools.mjs";

async function parse(path) {
    let input = await AOCTools.parseLines(path);
    return input;
}

function part1(input) {
    let parser = new FishNumParser(input[0]);
    let data = parser.parse();
    FishNumParser.reduce(data);
    for (let i=1; i < input.length; i++) {
        parser.init(input[i]);
        let nextData = parser.parse();
        FishNumParser.reduce(nextData);
        data = FishNumParser.add(data, nextData);
        console.log(data.numsInOrder.map(e=>e.val));
        FishNumParser.reduce(data);
        console.log(data.numsInOrder.map(e=>e.val));
    }
    FishNumParser.updateMags(data.root);
    console.log(data.root.mag);
}

function part2(input) {
    let magMax = -Infinity;
    let parser = new FishNumParser(input[0]);
    for (let i=0; i < input.length; i++) {
        for (let j=0; j < input.length; j++) {
            if (i === j) continue;
            parser.init(input[i]);
            let data1 = parser.parse();
            FishNumParser.reduce(data1);
            parser.init(input[j]);
            let data2 = parser.parse();
            FishNumParser.reduce(data2);
            let sum = FishNumParser.add(data1, data2);
            FishNumParser.reduce(sum);
            FishNumParser.updateMags(sum.root);
            magMax = Math.max(magMax, sum.root.mag);
        }
    }
    console.log(magMax);
}

class FishNumParser {
    strArray;
    pos = 0;

    static DIGITS = ["0","1","2","3","4","5","6","7","8","9","0"]

    constructor(str) {
        this.init(str);
    }

    init(str) {
        this.strArray = [...str];
        this.pos = 0;
    }

    advance() {
        return this.strArray[this.pos++];
    }

    parse() {
        let data = {numsInOrder:[], root:null};
        data.root = this.parseNum(data, null);
        return data;
    }

    parseNum(data, parent) {
        let char = this.advance();
        if (FishNumParser.DIGITS.includes(char)) {
            let num = {type:"normal", val:parseInt(char), parent:parent, depth:parent == null ? 0 : parent.depth+1};
            data.numsInOrder.push(num);
            return num;
        }
        else if (char === "[") {
            let num = {type:"snail", left:null, right:null, parent:parent, depth:parent == null ? 0 : parent.depth+1};
            num.left = this.parseNum(data, num);
            char = this.advance();
            if (char !== ",") throw new Error(`invalid char: ${char}`);
            num.right = this.parseNum(data, num);
            char = this.advance();
            if (char !== "]") throw new Error(`invalid char: ${char}`);
            return num;
        }
        else throw new Error(`invalid char: ${char}`);
    }

    static add(data1, data2) {
        let dataSum = {numsInOrder:[...data1.numsInOrder, ...data2.numsInOrder], 
            root:{type:"snail", left:data1.root, right:data2.root, parent:null, depth:-1}
        };
        data1.root.parent = dataSum.root;
        data2.root.parent = dataSum.root;
        for (let num of FishNumParser.iterNum(dataSum.root)) {
            num.depth++;
        }
        return dataSum;
    }

    static reduce(data) {
        while (true) {
            let reduced = true;
            for (let i=0; i < data.numsInOrder.length; i++) {
                let num = data.numsInOrder[i];
                if (num.depth > 4) {
                    //explode
                    // console.log("explode");
                    let explodedPair = num.parent;
                    let prevNum = data.numsInOrder[i-1];
                    let nextNum = data.numsInOrder[i+2];
                    if (explodedPair.right !== data.numsInOrder[i+1]) throw new Error("Something went wrong");
                    if (prevNum) {
                        prevNum.val += explodedPair.left.val;
                    }
                    if (nextNum) {
                        nextNum.val += explodedPair.right.val;
                    }
                    explodedPair.type = "normal";
                    delete explodedPair.left;
                    delete explodedPair.right;
                    explodedPair.val = 0;
                    data.numsInOrder.splice(i, 2, explodedPair);
                    reduced = false;
                    break;
                }
            }
            if (!reduced) continue;
            for (let i=0; i < data.numsInOrder.length; i++) {
                let num = data.numsInOrder[i];
                if (num.val > 9) {
                    //split
                    // console.log("split");
                    let leftVal = Math.floor(num.val/2);
                    let rightVal = Math.ceil(num.val/2);
                    num.type = "snail";
                    delete num.val;
                    num.left = {type:"normal", val:leftVal, parent:num, depth:num.depth+1};
                    num.right = {type:"normal", val:rightVal, parent:num, depth:num.depth+1};
                    data.numsInOrder.splice(i, 1, num.left, num.right);
                    reduced = false;
                    break;
                }
            }
            if (reduced) break;
        }
    }

    static *iterNum(num) {
        if (num.type === "normal") {
            yield num;
        }
        else {
            for (let subNum of FishNumParser.iterNum(num.left)) {
                yield subNum;
            }
            for (let subNum of FishNumParser.iterNum(num.right)) {
                yield subNum;
            }
            yield num;
        }
    }

    static updateMags(num) {
        for (let subNum of FishNumParser.iterNum(num)) {
            if (subNum.type === "snail") {
                let leftMag;
                if (subNum.left.type === "normal") {
                    leftMag = subNum.left.val*3;
                }
                else {
                    leftMag = subNum.left.mag*3;
                }
                let rightMag;
                if (subNum.right.type === "normal") {
                    rightMag = subNum.right.val*2;
                }
                else {
                    rightMag = subNum.right.mag*2;
                }
                subNum.mag = leftMag + rightMag;
            }
        }
    }
}

try {
    let path = "input";
    // let path = "test";
    let input = await parse(path);
    part1(input);
    part2(input);
}
catch (e) {
    if (e instanceof AOCTools.SolutionFound) {}
    else throw e;
}