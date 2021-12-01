import AOCTools from "../tools/AOCTools.mjs";

let input = await AOCTools.parseInput();

input = input.map((v) => Number.parseInt(v));
let prev = null;
let i = 0;
input.forEach(v => {
    if (prev !== null && v > prev) {
        i++;
    }
    prev = v;
});
console.log(i);

let a = null;
let b = null;
let c = null;
let prevSum = null;
let j = 0;
input.forEach(v => {
    if (a !== null && b !== null && c !== null) {
        let sum = a+b+c;
        if (prevSum !== null && sum > prevSum) j++;
        prevSum = sum;
    }
    c = b;
    b = a;
    a = v;
})
console.log(j);