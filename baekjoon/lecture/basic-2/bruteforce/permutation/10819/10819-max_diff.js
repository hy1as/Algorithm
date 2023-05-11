"use strict";
const {readFileSync} = require("fs");
const [_, groupOfNumbersString] = readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt").toString().split("\n");
const array = groupOfNumbersString.trim().split(" ").map(s => parseInt(s));

function nextPermutation(permutation) {
    let i = permutation.length - 1;
    while (i > 0 && permutation[i - 1] >= permutation[i]) {
        i -= 1;
    }
    if (i === 0) {
        return false;
    }
    let j = permutation.length - 1;
    while (permutation[i - 1] >= permutation[j]) {
        j -= 1;
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

function getAllPermutation(array) {
    const groupOfPermutation = [];
    const permutation = array.sort((a, b) => a - b);
    do {
        groupOfPermutation.push([...permutation]);
    } while (nextPermutation(permutation));
    return groupOfPermutation;
}

function getPermutationSumOfEachElementDiff(permutation) {
    let sum = 0;
    for (let i = 0; i < permutation.length - 1; i++) {
        sum += Math.abs(permutation[i] - permutation[i + 1]);
    }
    return sum;
}

function solution(array) {
    const groupOfPermutations = getAllPermutation(array);
    let maxValue = Number.MIN_VALUE;
    for (const permutation of groupOfPermutations) {
        maxValue = Math.max(maxValue, getPermutationSumOfEachElementDiff(permutation));
    }
    return maxValue;
}

console.log(solution(array));
