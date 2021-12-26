import AOCTools from "../tools/AOCTools.mjs";

async function parse(path) {
    let input = await AOCTools.parseLines(path);
    return input;
}

class ALU {
    program;
    w; x; y; z;

    constructor(program) {
        if (program) {
            this.init(program);
        }
    }

    init(program) {
        this.program = program;
        this.w = 0;
        this.x = 0;
        this.y = 0;
        this.z = 0;
    }

    run(input) {
        //input should be an array of numbers
        let inPos = 0;
        let progPos = 0;
        while (inPos < input.length || progPos < this.program.length) {
            let line = this.program[progPos++].split(" ");
            let op = line[0];
            let a = line[1];
            let b = line[2];
            let lit = false;
            if (["w","x","y","z"].includes(b)) {
                lit = false;
            }
            else {
                b = parseInt(b);
                lit = true;
            }
            if (op === "inp") {
                if (inPos >= input.length) break;
                this[a] = input[inPos++];
            }
            else if (op === "add") {
                this[a] = this[a] + (lit ? b : this[b]);
            }
            else if (op === "mul") {
                this[a] = this[a] * (lit ? b : this[b]);
            }
            else if (op === "div") {
                this[a] = Math.floor(this[a] / (lit ? b : this[b]));
            }
            else if (op === "mod") {
                this[a] = this[a] % (lit ? b : this[b]);
            }
            else if (op === "eql") {
                this[a] = ((this[a] === (lit ? b : this[b])) ? 1 : 0);
            }
            else throw new Error(`invalid op: ${op} ${a} ${b}`);
        }
        return this;
    }

    output() {
        return `w:${this.w} x:${this.x} y:${this.y} z:${this.z}`;
    }
}

function* yieldSerialNum(initNum) {
    let num = Math.max(initNum, 11111111111111);
    while (num <= 99999999999999) {
        yield num;
        num++;
        while (num.toString().split("").includes("0")) {
            num++;
        }
    }
}

function* yieldPartialSerial(digits) {
    let numArray = [];
    for (let i=0; i<digits; i++) {
        numArray.push("1");
    }
    let num = parseInt(numArray.join(""));
    let maxNumArray = [];
    for (let i=0; i<digits; i++) {
        maxNumArray.push("9");
    }    
    let maxNum = parseInt(maxNumArray.join(""));
    while (num <= maxNum) {
        yield num;
        num++;
        while (num.toString().split("").includes("0")) {
            num++;
        }
    }
}

function* yieldSerialNumReverse(initNum) {
    let num = Math.min(initNum, 99999999999999);
    while (num >= 11111111111111) {
        yield num;
        num--;
        while (num.toString().split("").includes("0")) {
            num--;
        }
    }
}

function part1(input) {
    let alu = new ALU(input);
    for (let num of yieldSerialNum()) {
        alu.run(num.toString().split("").map(e=>parseInt(e)));
        // console.log(num);
        // alu.output();
        if (alu.z === 0) {
            console.log(`valid: ${num}`);
            alu.output();
            let temp;
            // break;
        }
    }
}

function part2(input) {

}

function test(program, num) {
    let alu = new ALU(program);
    let input = num.toString().split("").map(e=>parseInt(e));
    alu.run(input);
    console.log(num, alu.output());
    if (alu.z === 0) {
        console.log(`valid: ${num}`);
    }
}

function solve1(program) {
    let alu = new ALU(program);
    let input = (11111111111111).toString().split("").map(e=>parseInt(e));
    let minZ = Infinity;
    for (let i=0; i < 14; i++) {
        let minZForDigit = Infinity;
        let bestDigit;
        for (let j=1; j < 10; j++) {
            input[i] = j;
            // console.log(input);
            alu.init(program);
            alu.run(input);
            if (alu.z < minZForDigit) {
                bestDigit = j;
                minZForDigit = alu.z;
                console.log(input, alu.z);
            }
        }
        input[i] = bestDigit;
        minZ = minZForDigit;
    }
}

function solve2(program) {
    let alu = new ALU(program);
    let numsWithX0 = [];
    for (let inputPart of yieldPartialSerial(3)) {
        alu.init(program);
        //largest: 99298993199873
        //digit 1 must be 6 higher than digit 14
        //digits 3,4 should be 18 or 29
        //digit 5 must be 1 less than digit 6
        //digit 11 must be 6 higher than digit 8
        //digits 9/10 must be 19
        //digit 2 must be 2 higher than digit 13
        //digit 7 must be 1 higher than digit 12

        let input = [7,3,1,8,1,2,2,1,1,9,7,...inputPart.toString().split("").map(e=>parseInt(e))];
        alu.run(input);
        // console.log(input, alu.output());
        // let temp;
        if (true) {
            let num = parseInt(input.map(e=>e.toString()).join(""));
            numsWithX0.push([num, alu.z]);
        }
    }
    numsWithX0.sort((a,b)=>a[1] < b[1] ? -1 : a[1] === b[1] ? 0 : 1);
    console.log(numsWithX0);
}

try {
    let path = "input";
    // let path = "test";
    let input = await parse(path);
    // test(input, 99299);
    solve2(input);
    // part1(input);
    // part2(input);
}
catch (e) {
    if (e instanceof AOCTools.SolutionFound) {}
    else throw e;
}