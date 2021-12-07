import AOCTools from "../tools/AOCTools.mjs";

let input = await AOCTools.parseLines('input');

// input = input.slice(0, 5);

let gam = '';
let eps = '';
for (let i=0; i < input[0].length; i++) {
    let cnt0 = 0;
    let cnt1 = 0;
    for (let line of input) {
        if (line[i] === "1") cnt1++;
        else cnt0++;
    }
    if (cnt0 > cnt1) {
        gam += "0";
        eps += "1";
    }
    else {
        gam += "1";
        eps += "0";
    }
}
console.log(gam, eps);
// 2502 1593

let o2 = '';
let c02 = '';

let inCopy = [...input];
for (let i=0; i < inCopy[0].length; i++) {
    let cnt0 = 0;
    let cnt1 = 0;
    let idxToRem = [];
    for (let line of inCopy) {
        if (line[i] === "1") cnt1++;
        else cnt0++;
    }
    if (cnt0 > cnt1) {
        for (let j=inCopy.length-1; j >= 0; j--) {
            if (inCopy[j][i] !== "0") inCopy.splice(j, 1);
        }
    }
    else {
        for (let j=inCopy.length-1; j >= 0; j--) {
            if (inCopy[j][i] !== "1") inCopy.splice(j, 1);
        }
    }
}
console.log(inCopy);

inCopy = [...input];
for (let i=0; i < inCopy[0].length; i++) {
    // console.log(inCopy);
    let cnt0 = 0;
    let cnt1 = 0;
    for (let line of inCopy) {
        if (line[i] === "1") cnt1++;
        else cnt0++;
    }
    // console.log(cnt0, cnt1);
    if (cnt0 <= cnt1) {
        for (let j=inCopy.length-1; j >= 0; j--) {
            if (inCopy[j][i] !== "0") inCopy.splice(j, 1);
        }
    }
    else if (cnt0 > cnt1) {
        for (let j=inCopy.length-1; j >= 0; j--) {
            if (inCopy[j][i] !== "1") inCopy.splice(j, 1);
        }
    }
    if (inCopy.length <= 1) break;
}
console.log(inCopy);