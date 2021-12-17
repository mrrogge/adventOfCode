import AOCTools from "../tools/AOCTools.mjs";
import * as fs from "fs/promises";
import { assert } from "console";

async function parse(path) {
    let input = await AOCTools.parseSectionsOfLines(path);
    let template = input[0][0];
    let rules = input[1].map(line=>line.split(" -> "))
        .map(line=>{return {
            in:line[0],
            out:line[1]
        }});
    let rulesMap = {};
    rules.forEach(rule=>{
        assert(!rulesMap[rule.in]);
        rulesMap[rule.in] = rule.out;
    })
    return {
        template:template,
        rulesMap:rulesMap
    };
}

function totalsFromTemplate(template) {
    let totals = {pairs:{}, elmts:{}, str:template};
    let templateArray = [...template];
    templateArray.forEach((char, idx)=>{
        totals.elmts[char] = totals.elmts[char] || 0;
        totals.elmts[char]++;
        if (idx === templateArray.length-1) return;
        let pair = `${templateArray[idx]}${templateArray[idx+1]}`;
        totals.pairs[pair] = totals.pairs[pair] || 0;
        totals.pairs[pair]++;
    });
    return totals;
}

function insert(totals, rulesMap) {
    // This part updates the actual polymer string, but for lots of iterations we run out of memory so its commented out.
    // let strArray = [...totals.str];
    // let newStrArray = [];
    // strArray.forEach((char, idx)=>{
    //     if (idx === strArray.length-1) return;
    //     let pairStr = `${char}${strArray[idx+1]}`;
    //     let insertedChar = rulesMap[pairStr];
    //     if (insertedChar) {
    //         newStrArray.pop();
    //         newStrArray.push(char, insertedChar, strArray[idx+1]);
    //     }
    // });
    // totals.str = newStrArray.join("");
    let pairsToAdd = {};
    Object.keys(rulesMap).forEach(ruleIn=>{
        let ruleOut = rulesMap[ruleIn];
        let pairCount = totals.pairs[ruleIn];
        if (pairCount && pairCount > 0) {
            totals.pairs[ruleIn] = 0;
            let inArray = [...ruleIn];
            let newPair1 = [inArray[0], ruleOut].join('');
            let newPair2 = [ruleOut, inArray[1]].join('');
            pairsToAdd[newPair1] = pairsToAdd[newPair1] || 0;
            pairsToAdd[newPair2] = pairsToAdd[newPair2] || 0;
            pairsToAdd[newPair1] += pairCount;
            pairsToAdd[newPair2] += pairCount;
            totals.elmts[ruleOut] = totals.elmts[ruleOut] || 0;
            totals.elmts[ruleOut] += pairCount;
        }
    });
    Object.keys(pairsToAdd).forEach(pairToAdd=>{
        totals.pairs[pairToAdd] = totals.pairs[pairToAdd] || 0;
        totals.pairs[pairToAdd] += pairsToAdd[pairToAdd];
    });
    return totals;
}

function part1(input) {
    let totals = totalsFromTemplate(input.template);
    for (let i=0; i < 10; i++) {
        totals = insert(totals, input.rulesMap);
        // console.log(totals.str);
        // console.log(totals);
    }
    let totalsKeys = Object.keys(totals.elmts);
    let min = totalsKeys.reduce((prev, cur)=>Math.min(prev, totals.elmts[cur]), totals.elmts[totalsKeys[0]]);
    let max = totalsKeys.reduce((prev, cur)=>Math.max(prev, totals.elmts[cur]), 0);
    console.log(min, max, max-min);
}

function part2(input) {
    let totals = totalsFromTemplate(input.template);
    for (let i=0; i < 40; i++) {
        totals = insert(totals, input.rulesMap);
        // console.log(totals.str);
        // console.log(totals);
    }
    let totalsKeys = Object.keys(totals.elmts);
    let min = totalsKeys.reduce((prev, cur)=>Math.min(prev, totals.elmts[cur]), totals.elmts[totalsKeys[0]]);
    let max = totalsKeys.reduce((prev, cur)=>Math.max(prev, totals.elmts[cur]), 0);
    console.log(min, max, max-min);
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