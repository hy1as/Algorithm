"use strict";
const {readFileSync} = require("fs");
const [N, currentPermutationString] = readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt").toString().split("\n").map(s => s.trim());
const range = parseInt(N);
const permutation = currentPermutationString.trim().split(" ").map(s => parseInt(s));

function nextPermutation(array) {
    let i = array.length - 1;
    while (0 < i && array[i] <= array[i - 1]) {
        i--;
    }
    if (i === 0) {
        return false;
    }
    let j = array.length - 1;
    while (array[i - 1] >= array[j]) {
        j--;
    }
    [array[i - 1], array[j]] = [array[j], array[i - 1]];
    let k = array.length - 1;
    while (i < k) {
        [array[i], array[k]] = [array[k], [array[i]]];
        i++;
        k--;

    }
    return true;
}


console.log(nextPermutation(permutation) ? permutation.join(" ") : -1);

