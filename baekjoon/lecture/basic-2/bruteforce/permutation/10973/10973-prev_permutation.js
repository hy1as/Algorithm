"use strict";
const {readFileSync} = require("fs");
const [N, permutationString] = readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt").toString().trim().split("\n");
const range = parseInt(N);
const permutation = permutationString.split(" ").map(s => parseInt(s));

function prevPermutation(permutation) {
    let i = permutation.length - 1;
    while (0 < i && permutation[i] >= permutation[i - 1]) {
        i--;
    }
    if (i === 0) {
        return false;
    }
    let j = permutation.length - 1;
    while (permutation[i - 1] <= permutation[j]) {
        j--;
    }
    [permutation[i - 1], permutation[j]] = [permutation[j], permutation[i - 1]];

    let k = permutation.length - 1;
    while (i < k) {
        [permutation[i], permutation[k]] = [permutation[k], permutation[i]];
        i++;
        k--;
    }

    return true;
}


console.log(prevPermutation(permutation) ? permutation.join(" ") : -1);