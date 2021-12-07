import AOCTools from "../tools/AOCTools.mjs";

async function parse(path) {
    let input = await AOCTools.parseLines(path);
    input = input[0].split(',').map(e=>parseInt(e));
    return input;
}

function part1(input) {
    for (let i=0; i < 80; i++) {
        advance(input);
    }
    console.log(input.length);
}

function part2(input) {
    let fishByDay = [];
    input.forEach(fish=>{
        fishByDay[fish] = fishByDay[fish] || 0;
        fishByDay[fish]++;
    })
    console.log(fishByDay);
    for (let i=0; i < 256; i++) {
        advance2(fishByDay);
        console.log(fishByDay);
    }
    console.log(fishByDay.reduce((prev, cur)=>prev+cur, 0))

    // let prevCycleTotal = input.length;

    // for (let i=0; i < 8; i++) {
    //     for (let j=0; j < 8; j++) {
    //         advance(input);
    //     }
    //     let curCycleTotal = input.length;
    //     let diff = curCycleTotal-prevCycleTotal;
    //     let diffRate = diff/prevCycleTotal;
    //     console.log(i, prevCycleTotal, curCycleTotal, diff, diffRate);
    //     prevCycleTotal = curCycleTotal;
    // }
}

function advance(fishes) {
    let newFishes = [];
    fishes.forEach((fish, idx)=>{
        fishes[idx] -= 1;
        if (fishes[idx] == -1) {
            fishes[idx] = 6;
            newFishes.push(8);
        }
    })
    newFishes.forEach(newFish=>fishes.push(newFish));
}

function advance2(fishByDay) {
    let spawningFish = fishByDay.shift() || 0;
    fishByDay[6] = fishByDay[6] || 0;
    fishByDay[6] += spawningFish;
    fishByDay[8] = fishByDay[8] || 0;
    fishByDay[8] += spawningFish;
}

try {
    let input = await parse('input');
    // part1(input);
    part2(input);
}
catch (e) {
    if (e instanceof AOCTools.SolutionFound) {}
    else throw e;
}