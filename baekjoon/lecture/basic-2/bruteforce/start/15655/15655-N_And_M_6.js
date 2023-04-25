"use strict";

const {readFileSync} = require("fs");
const [conditionsString, groupOfNumbersString] = readFileSync(process.platform === "linux" ?
    "/dev/stdin" : "input.txt").toString().trim().split("\n").map(s => s.trim());
const [countOfNumbers, M] = conditionsString.split(" ").map(n => parseInt(n));
const groupOfNumbers = groupOfNumbersString.split(" ").map(n => parseInt(n)).sort((a, b) => a - b);

function go(index, groupOfNumbers, M, check, groupOfSequences, currentSequence = []) {
    if (index === M) {
        groupOfSequences.push(currentSequence.join(" "));
        return;
    }

    for (let i = 0; i < groupOfNumbers.length; i++) {
        if (check[i] || (0 < index && currentSequence[index - 1] > groupOfNumbers[i])) {
            continue;
        }
        check[i] = true;
        currentSequence[index] = groupOfNumbers[i];
        go(index + 1, groupOfNumbers, M, check, groupOfSequences, currentSequence);
        check[i] = false;
    }
}

function solution(groupOfNumbers, M) {
    const groupOfSequences = [];
    const check = Array.from({
        length: groupOfNumbers.length
    }, () => false);
    go(0, groupOfNumbers, M, check, groupOfSequences);
    return groupOfSequences;
}

const answer = solution(groupOfNumbers, M);
console.log(answer.join("\n"));

