import * as fs from "fs/promises";

let input;

try {
    input = await fs.readFile("input");
}
catch (e) {
    console.log(e);
}

input = input.toString().split(/\r?\n/).map((val) => Number.parseInt(val));

let part1 = input.forEach((x) => {
    input.forEach((y) => {
        if (x + y === 2020) console.log(x, y, x*y);
    });
});

let part2 = input.forEach((x) => {
    input.forEach((y) => {
        input.forEach((z) => {
            if (x+y+z === 2020) console.log(x, y, z, x*y*z);
        });
    });
});

