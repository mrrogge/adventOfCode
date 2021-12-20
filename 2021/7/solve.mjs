import AOCTools from "../tools/AOCTools.mjs";

async function parse(path) {
    let input = await AOCTools.parseLines(path);
    input = input[0].split(',').map(e=>parseInt(e));
    return input;
}

function part1(input) {
    let crabs = [...input];
    let fuelUse = [];
    // console.log(crabs);
    // console.log(Math.max(...crabs));
    for (let i=0; i < Math.max(...crabs); i++) {
        fuelUse[i] = align(crabs, i);
    }
    // console.log(fuelUse);
    console.log(Math.min(...fuelUse));
}

function align(crabs, pos) {
    let fuel = 0;
    crabs.forEach((crab, idx) => {
        fuel += Math.abs(crab-pos);
        // console.log(fuel, crab, pos);
    });
    return fuel;
}

function align2(crabs, pos) {
    let fuel = 0;
    crabs.forEach((crab) => {
        let dist = Math.abs(crab-pos);
        let cost = 0;
        for (let i=0; i < dist; i++) {
            cost += 1;
            fuel += cost;
        }
    });
    return fuel;
}

function part2(input) {
    let crabs = [...input];
    let fuelUse = [];
    for (let i=0; i < Math.max(...crabs); i++) {
        fuelUse[i] = align2(crabs, i);
        // console.log(i, fuelUse[i])
    }
    console.log(Math.min(...fuelUse));
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