import * as fs from "fs/promises";

export default {
    parseInput: async function(path="input") {
        let input = await fs.readFile(path);
        return input.toString().split(/\r?\n/);
    }
}