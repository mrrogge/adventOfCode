import AOCTools from "../tools/AOCTools.mjs";

async function parse(path) {
    let input = await AOCTools.parseLines(path);
    input = input.map(e=>e.split(''));
    return input;
}

function part1(input) {
    let score = 0;
    input.forEach(line=>{
        let result = evalLine(line);
        if (result.status === 'corrupt') {
            score += scoreForSym(result.sym);
        }
    });
    console.log(score);
}

function evalLine(line) {
    let stack = [];
    for (let sym of line) {
        if (['(', '[', '{', '<'].includes(sym)) {
            stack.push(sym);
        }
        else {
            if (stack.length === 0) return {status:'corrupt', sym:sym};
            let top = stack[stack.length-1];
            if (top === '(' && sym === ')'
            || top === '[' && sym === ']'
            || top === '{' && sym === '}'
            || top === '<' && sym === '>')
            {
                stack.pop();
            }
            else return {status:'corrupt', sym:sym};
        }
    }
    if (stack.length > 0) {
        //incomplete
        let autoCompSyms = [];
        while (stack.length > 0) {
            let left = stack.pop();
            if (left === '(') autoCompSyms.push(')');
            else if (left === '[') autoCompSyms.push(']');
            else if (left === '{') autoCompSyms.push('}');
            else if (left === '<') autoCompSyms.push('>');
        }
        return {status:'incomplete', syms:autoCompSyms};
    }
    return {status:'ok', sym:null};
}

function scoreForSym(sym) {
    if (sym === ')') return 3;
    if (sym === ']') return 57;
    if (sym === '}') return 1197;
    if (sym === '>') return 25137;
}

function autoCompScore(syms) {
    let score = 0;
    for (let sym of syms) {
        score *= 5;
        if (sym === ')') score += 1;
        else if (sym === ']') score += 2;
        else if (sym === '}') score += 3;
        else if (sym === '>') score += 4;
    }
    return score;
}

function part2(input) {
    let scores = [];
    input.forEach(line=>{
        let result = evalLine(line);
        if (result.status === 'incomplete') {
            scores.push(autoCompScore(result.syms));
        }
    });
    scores.sort((a,b)=>a<b ? -1 : a===b ? 0 : 1);
    console.log(scores[Math.floor(scores.length/2)]);
}

try {
    let input = await parse('input');
    // let input = await parse('test');
    part1(input);
    part2(input);
}
catch (e) {
    if (e instanceof AOCTools.SolutionFound) {}
    else throw e;
}