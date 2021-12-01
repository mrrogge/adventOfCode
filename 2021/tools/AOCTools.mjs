import * as fs from "fs/promises";

export default {
    /**
     * Reads an input file and parses it into an array of lines as strings.
     * @param path 
     * @returns 
     */
    parseInput: async function(path="input") {
        let input = await fs.readFile(path);
        return input.toString().split(/\r?\n/);
    }
}