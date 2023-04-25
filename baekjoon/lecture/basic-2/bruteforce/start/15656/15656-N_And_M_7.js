"use strict";
const {readFileSync} = require("fs");
const [conditionString, groupOfNumberString] = readFileSync(process.platform === "linux" ?
    "/dev/stdin" : "input.txt").toString().split("\n").map(s => s.trim());
const [countOfNumbers, M] = conditionString.split(" ").map(n => parseInt(n));
const groupOfNumbers = groupOfNumberString.split(" ").map(s => parseInt(s)).sort((a, b) => a - b);

function go(index, groupOfNumbers, M, groupOfSequences, currentSequence = []) {
    if (index === M) {
        groupOfSequences.push(currentSequence.join(" "));
        return;
    }
    for (let i = 0; i < groupOfNumbers.length; i++) {
        currentSequence[index] = groupOfNumbers[i];
        go(index + 1, groupOfNumbers, M, groupOfSequences, currentSequence);
    }
}

function solution(groupOfNumbers, M) {
    const groupOfSequences = [];
    go(0, groupOfNumbers, M, groupOfSequences);
    return groupOfSequences;
}

const answer = solution(groupOfNumbers, M);

console.log(answer.join("\n"));