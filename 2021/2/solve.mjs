import AOCTools from "../tools/AOCTools.mjs";

let input = await AOCTools.parseLines();
input = input.map((v)=>{return v.split(' ')});
let pos = 0;
let depth = 0;
input.forEach(e => {
    if (e[0] === 'down') {
        depth += parseInt(e[1]);
    }
    else if (e[0] === 'up') {
        depth -= parseInt(e[1]);
    }
    else if (e[0] === 'forward') {
        pos += parseInt(e[1]);
    }
});
console.log(pos*depth);

pos = 0;
depth = 0;
let aim = 0;
input.forEach(e => {
    if (e[0] === 'down') {
        aim += parseInt(e[1]);
    }
    else if (e[0] === 'up') {
        aim -= parseInt(e[1]);
    }
    else if (e[0] === 'forward') {
        pos += parseInt(e[1]);
        depth += parseInt(e[1]) * aim;
    }
});
console.log(pos*depth);