"use strict";
const {readFileSync} = require("fs");
const N = parseInt(readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt").toString().trim());
const permutation = [];
for (let i = 1; i <= N; i++) {
    permutation.push(i);
}

function nextPermutation(permutation) {
    let i = permutation.length - 1;
    while (i > 0 && permutation[i] <= permutation[i - 1]) {
        i--;
    }
    if (i === 0) {
        return false;
    }
    let j = permutation.length - 1;
    while (permutation[i - 1] >= permutation[j]) {
        j--;
    }
    [permutation[i - 1], permutation[j]] = [permutation[j], permutation[i - 1]];
    let k = permutation.length - 1;
    while (i < k) {
        [permutation[i], permutation[k]] = [permutation[k], permutation[i]];
        i += 1;
        k -= 1;
    }
    return true;
}

const answer = [];
do {
    answer.push([...permutation].join(" "));
} while (nextPermutation(permutation));

console.log(answer.join("\n"));
