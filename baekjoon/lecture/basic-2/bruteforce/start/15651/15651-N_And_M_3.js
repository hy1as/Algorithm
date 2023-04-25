"use strict";

const {readFileSync} = require("fs");
const [N, M] = readFileSync(process.platform === "linux" ? "/dev/stdin" :
    "input.txt").toString().trim().split(" ").map(n => parseInt(n));

function go(index, N, M, groupOfSequences, currentSequence = []) {
    if (index === M) {
        groupOfSequences.push(currentSequence.join(" "));
        return;
    }
    for (let i = 1; i <= N; i++) {
        currentSequence[index] = i;
        go(index + 1, N, M, groupOfSequences, currentSequence);
    }
}

function solution(N, M) {
    const groupOfSequences = [];
    go(0, N, M, groupOfSequences);
    return groupOfSequences;
}

const answer = solution(N, M);
console.log(answer.join("\n"));