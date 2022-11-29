import { assert } from "console";
import AOCTools from "../tools/AOCTools.mjs";

async function parse(path) {
    let input = await AOCTools.parseLines(path);
    input = input[0].split(" ");
    // console.log(input);
    let xRange = input[2].split("=")[1].slice(0, -1).split("..").map(comp=>parseInt(comp));
    let yRange = input[3].split("=")[1].split("..").map(comp=>parseInt(comp));
    return {
        xMin: xRange[0],
        xMax: xRange[1],
        yMin: yRange[0],
        yMax: yRange[1]
    }
}

function makeProbe(vx, vy) {
    return {
        x: 0,
        y: 0,
        vx: vx,
        vy: vy
    }
}

function advanceProbe(probe) {
    probe.x += probe.vx;
    probe.y += probe.vy;
    probe.vx = probe.vx < 0 ? probe.vx+1 : probe.vx === 0 ? probe.vx : probe.vx > 0 ? probe.vx-1 : null;
    // console.log(probe.vx);
    probe.vy -= 1;
}

//0=in air, 1=in target zone, 2=too short, 3=too far
function checkProbe(probe, target) {
    if (probe.x < target.xMin) {
        if (probe.y > target.yMax) return 0;
        else if (target.yMin <= probe.y && probe.y <= target.yMax) return 0;
        else if (probe.y < target.yMin) return 2;
        else throw new Error();
    }
    else if (target.xMin <= probe.x && probe.x <= target.xMax) {
        if (probe.y > target.yMax) return 0;
        else if (target.yMin <= probe.y && probe.y <= target.yMax) return 1;
        else if (probe.y < target.yMin) return 2;
        else throw new Error();
    }
    else if (probe.x > target.xMax) return 3;
    else throw new Error();
}

function part1(input) {
    let target = input;
    let vyInit = 1;
    let maxY = 0;
    while (vyInit < 1000) {
        let vxInit = 1;
        let validVxExists = false;
        while (true) {
            let probe = makeProbe(vxInit, vyInit);
            let result;
            let maxYThisProbe = probe.y;
            do {
                // console.log(probe, maxYThisProbe);
                advanceProbe(probe);
                maxYThisProbe = Math.max(maxYThisProbe, probe.y);
                result = checkProbe(probe, target);
            }
            while (result === 0);
            if (result === 1) {
                // console.log("target", vxInit, vyInit, probe.x, probe.y, maxYThisProbe);
                maxY = Math.max(maxY, maxYThisProbe);
                validVxExists = true;
                vxInit++;
            }
            else if (result === 2) {
                // if (vyInit >= 65) console.log("too short", vxInit, vyInit, probe.x, probe.y, maxYThisProbe);
                vxInit++;
            }
            else if (result === 3) {
                // console.log("too far", vxInit, vyInit, probe.x, probe.y, maxYThisProbe);
                break;
            }
        }
        if (!validVxExists) {
        //     break;
        }
        // else {
            vyInit++;
        // }
    }
    console.log("part1:", maxY);
}

function part2(input) {
    let target = input;
    let vyInit = -1000;
    let maxY = 0;
    let cnt = 0;
    while (vyInit < 1000) {
        let vxInit = 1;
        let validVxExists = false;
        while (vxInit < 2000) {
            let probe = makeProbe(vxInit, vyInit);
            let result;
            let maxYThisProbe = probe.y;
            do {
                // console.log(probe, maxYThisProbe);
                advanceProbe(probe);
                maxYThisProbe = Math.max(maxYThisProbe, probe.y);
                result = checkProbe(probe, target);
            }
            while (result === 0);
            if (result === 1) {
                console.log("target", vxInit, vyInit, probe.x, probe.y, maxYThisProbe);
                cnt++;
                maxY = Math.max(maxY, maxYThisProbe);
                validVxExists = true;
                vxInit++;
            }
            else if (result === 2) {
                // if (vyInit >= 65) console.log("too short", vxInit, vyInit, probe.x, probe.y, maxYThisProbe);
                vxInit++;
            }
            else if (result === 3) {
                // console.log("too far", vxInit, vyInit, probe.x, probe.y, maxYThisProbe);
                // break;
                vxInit++;
            }
        }
        if (!validVxExists) {
        //     break;
        }
        // else {
            vyInit++;
        // }
    }
    console.log(cnt);
}

try {
    let input = await parse('input');
    // let input = await parse('test');
    console.log(input);
    part1(input);
    part2(input);
}
catch (e) {
    if (e instanceof AOCTools.SolutionFound) {}
    else throw e;
}