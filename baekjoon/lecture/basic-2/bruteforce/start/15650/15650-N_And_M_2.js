"use strict";

const {readFileSync} = require("fs");
const [N, M] = readFileSync(process.platform === "linux" ? "/dev/stdin" :
    "input.txt").toString().trim().split(" ").map(n => parseInt(n));

function go(index, N, M, check, groupOfSequences, currentSequence = []) {
    if (index === M) {
        groupOfSequences.push(currentSequence.join(" "));
        return;
    }
    for (let i = 1; i <= N; i++) {
        if (check[i] || (0 < index && i < currentSequence[index - 1])) {
            continue;
        }
        check[i] = true;
        currentSequence[index] = i;
        go(index + 1, N, M, check, groupOfSequences, currentSequence);
        check[i] = false;
    }
}

function solution(N, M) {
    const groupOfSequences = [];
    const check = Array.from({
        length: N + 1,
    }, () => false);
    go(0, N, M, check, groupOfSequences);
    return groupOfSequences;
}

const answer = solution(N, M);
console.log(answer.join("\n"));