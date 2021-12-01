import AOCTools from "../tools/AOCTools.mjs";

let input = await AOCTools.parseInput();

let re1 = /^(?<op>[A-Z]+) (?<in1>[\da-z]+) \-\> (?<out>[\da-z]+).*/;
let re2 = /^(?<in1>[\da-z]+) (?<op>[A-Z]+) (?<in2>[\da-z]+) \-\> (?<out>[\da-z]+).*/;
let conns = input.slice(0,50).map((line) => {
    let match = line.match(re1);
    if (match) return match.groups;
    match = line.match(re2);
    if (match) return match.groups;
    throw new Error("Regex didn't match");
});
console.log(conns[4]);