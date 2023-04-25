"use strict";
const {readFileSync} = require("fs");
const [conditionString, groupOfNumbersString] = readFileSync(process.platform === "linux" ?
    "/dev/stdin" :
    "input.txt").toString().split("\n").map(s => s.trim());
const [_, M] = conditionString.split(" ").map(s => parseInt(s));
const groupOfNumbers = groupOfNumbersString.split(" ").map(s => parseInt(s)).sort((a, b) => (a -
    b));


function go(index, groupOfNumbers, M, groupOfSequences, currentSequence = []) {
    if (index === M) {
        groupOfSequences.add(currentSequence.join(" "));
        return;
    }

    for (let i = 0; i < groupOfNumbers.length; i++) {
        currentSequence[index] = groupOfNumbers[i];
        go(index + 1, groupOfNumbers, M, groupOfSequences, currentSequence);
    }
}

function solution(groupOfNumbers, M) {
    const groupOfSequences = new Set();
    go(0, groupOfNumbers, M, groupOfSequences);
    return [...groupOfSequences];
}

const answer = solution(groupOfNumbers, M);
console.log(answer.join("\n"));