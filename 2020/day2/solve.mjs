import * as fs from "fs/promises";

let input;

try {
    input = await fs.readFile("input");
}
catch (e) {
    console.log(e);
}

input = input.toString().split(/\r?\n/);
let re = /(?<min>[\d]+)-(?<max>[\d]+) (?<char>[a-z])\: (?<ptn>[a-z]+)/;
let groups = input.map((line) => {
    return line.match(re).groups;
});
groups = groups.map((group) => {
    return {
        min: Number.parseInt(group.min),
        max: Number.parseInt(group.max),
        char: group.char,
        ptn: group.ptn
    }
});
let part1 = 0;
groups.forEach((group) => {
    let ptnCount = [...(group.ptn.match(new RegExp(`${group.char}`, "g")) || [])].length;
    if (group.min <= ptnCount && ptnCount <= group.max) part1++;
});
console.log(part1);

let part2 = 0;
groups.forEach((group) => {
    if (
        (group.ptn[group.min-1] === group.char && group.ptn[group.max-1] !== group.char)
        || (group.ptn[group.min-1] !== group.char && group.ptn[group.max-1] === group.char)
    ) part2++;
});
console.log(part2);