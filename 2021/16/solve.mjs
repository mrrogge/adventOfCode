import AOCTools from "../tools/AOCTools.mjs";

async function parse(path) {
    let input = await AOCTools.parseLines(path);
    return input[0];
}

function print(...data) {
    // console.log(...data);
}

function part1(input) {
    let parser = new BitsParser(input);
    // print(parser.binArray);
    let tokens = parser.parse();
    let versionSum = 0;
    tokens.forEach(token=>{
        if (token.type === "version") {
            // console.log(token.val);
            versionSum += token.val;
        }
    });
    // console.log(tokens);
    console.log(versionSum);
}

function part2(input) {
    let parser = new BitsParser(input);
    let tokens = parser.parse();
    // console.log(tokens);
    let evaluator = new BitsEvaluator(tokens);
    let result = evaluator.run();
    console.log(result);
}

class BitsParser {
    str;
    hexArray;
    numArray;
    binArray;
    pos = 0;
    constructor(str) {
        this.str = str;
        this.hexArray = [...str];
        this.numArray = this.hexArray.map(hex=>parseInt(hex, 16));
        this.binArray = this.numArray
            .map(num=>num.toString(2).padStart(4, "0").split(""))
            .flat()
            .map(bin=>parseInt(bin));
    }

    parse() {
        print(this.boolArray);
        let tokens = [];
        this.pos = 0;
        this.consumePacket(tokens);
        tokens.push({type:"eof"});
        return tokens;
    }

    advance(dist=1) {
        let val = BigInt(0);
        for (let i=0; i < dist; i++) {
            val <<= BigInt(1);
            val += BigInt(this.binArray[this.pos++]);
            print(val);
        }
        return Number(val);
    }

    peek(dist=1) {
        return this.binArray[this.pos+dist];
    }

    OP_TYPES = ["sum", "product", "min", "max", "grt", "less", "eq"];

    consumePacket(tokens) {
        let version = this.consumeVersion(tokens);
        let typeId = this.consumeTypeId(tokens);
        if (typeId.val === "literal") {
            let numLit = this.consumeNumLit(tokens);
        }
        else if (this.OP_TYPES.includes(typeId.val)) {
            let lenType = this.consumeLenType(tokens);
            if (lenType.type === "bitLen") {
                tokens.push({type:"("});
                let startIdx = this.pos;
                while (this.pos - startIdx < lenType.val) {
                    this.consumePacket(tokens);
                }
                tokens.push({type:")"});             
            }
            else if (lenType.type === "packetCount") {
                tokens.push({type:"("});
                for (let i=0; i<lenType.val; i++) {
                    this.consumePacket(tokens);
                }
                tokens.push({type:")"});
            }
            else throw new Error(`unexpected type: ${lenType.type}`);
        }
        else throw new Error(`unexpected type: ${typeId.val}`);
    }

    consumeVersion(tokens) {
        let versionVal = this.advance(3);
        let token = {type:"version", val:versionVal};
        tokens.push(token);
        return token;
    }

    consumeTypeId(tokens) {
        let typeVal = this.advance(3);
        let typeId;
        if (typeVal === 0) typeId = "sum";
        else if (typeVal === 1) typeId = "product";
        else if (typeVal === 2) typeId = "min";
        else if (typeVal === 3) typeId = "max";
        else if (typeVal === 4) typeId = "literal";
        else if (typeVal === 5) typeId = "grt";
        else if (typeVal === 6) typeId = "less";
        else if (typeVal === 7) typeId = "eq";
        else throw new Error(`invalid type: ${typeVal}`);
        let token = {type:"type", val:typeId};
        tokens.push(token);
        return token;
    }

    consumeNumLit(tokens) {
        let val = BigInt(0);
        while (true) {
            let flag = this.advance();
            let group = this.advance(4);
            val = (val << BigInt(4)) + BigInt(group);
            if (flag === 0) {
                break;
            }
        }
        let token = {type:"numLit", val:Number(val)};
        tokens.push(token);
        return token;
    }

    consumeLenType(tokens) {
        let typeFlag = this.advance();
        let tokenType;
        let val;
        if (typeFlag === 0) {
            tokenType = "bitLen";
            val = this.advance(15);
        }
        else if (typeFlag === 1) {
            tokenType = "packetCount";
            val = this.advance(11);
        }
        let token = {type:tokenType, val:val};
        tokens.push(token);
        return token;
    }
}

class BitsEvaluator {
    tokens;
    pos = 0;

    constructor(tokens) {
        this.tokens = tokens;
    }

    consumeType(type) {
        let token = this.tokens[this.pos++];
        if (token.type !== type) throw new Error(`unexpected token: ${token.type}`);
        return token;
    }

    peek(dist=0) {
        return this.tokens[this.pos+dist];
    }

    run() {
        this.pos = 0;
        let result = this.consumePacket();
        this.consumeType("eof");

        return result;
    }

    consumePacket() {
        let version = this.consumeType("version");
        let type = this.consumeType("type");
        if (type.val === "literal") {
            let literal = this.consumeType("numLit");
            // console.log(literal.val);
            return literal.val;
        }
        else {
            let val;
            let lenToken = this.peek();
            if (lenToken.type === "packetCount") {
                lenToken = this.consumeType("packetCount");
            }
            else if (lenToken.type === "bitLen") {
                lenToken = this.consumeType("bitLen");
            }
            else throw new Error(`unexpected token: ${lenToken.type}`);
            //OP_TYPES = ["sum", "product", "min", "max", "grt", "less", "eq"];
            this.consumeType("(");
            if (type.val === "sum") {
                let terms = [];
                let nextToken = this.peek();
                while (nextToken.type !== ")") {
                    terms.push(this.consumePacket());
                    nextToken = this.peek();
                }
                this.consumeType(")");
                val = terms.reduce((prev, cur)=>prev+cur, 0);
                // console.log("+", terms);

            }
            else if (type.val === "product") {
                let terms = [];
                let nextToken = this.peek();
                while (nextToken.type !== ")") {
                    terms.push(this.consumePacket());
                    nextToken = this.peek();
                }
                this.consumeType(")");
                val = terms.reduce((prev, cur)=>prev*cur, 1);
                // console.log("*", terms);
            }
            else if (type.val === "min") {
                let terms = [];
                let nextToken = this.peek();
                while (nextToken.type !== ")") {
                    terms.push(this.consumePacket());
                    nextToken = this.peek();
                }
                this.consumeType(")");
                val = terms.reduce((prev, cur)=>Math.min(prev, cur), Infinity);
                // console.log("min", terms);
            }
            else if (type.val === "max") {
                let terms = [];
                let nextToken = this.peek();
                while (nextToken.type !== ")") {
                    terms.push(this.consumePacket());
                    nextToken = this.peek();
                }
                this.consumeType(")");
                val = terms.reduce((prev, cur)=>Math.max(prev, cur), -Infinity);
                // console.log("max", terms);
            }
            else if (type.val === "grt") {
                let left = this.consumePacket();
                let right = this.consumePacket();
                this.consumeType(")");
                val = left > right ? 1 : 0;
                // console.log("grt", left, right);
            }
            else if (type.val === "less") {
                let left = this.consumePacket();
                let right = this.consumePacket();
                this.consumeType(")");
                val = left < right ? 1 : 0;
                // console.log("less", left, right);
            }
            else if (type.val === "eq") {
                let left = this.consumePacket();
                let right = this.consumePacket();
                this.consumeType(")");
                val = left === right ? 1 : 0;
                // console.log("eq", left, right);
            }
            else throw new Error(`unexpected token: ${type.val}`);
            // console.log(val);
            if (val < 0) throw new Error(`negative: ${val}`);
            return val;
        }
    }
}

try {
    let input = await parse('input');
    // let input = await parse('test7');
    // console.log(input);
    part1(input);
    part2(input);
}
catch (e) {
    if (e instanceof AOCTools.SolutionFound) {}
    else throw e;
}