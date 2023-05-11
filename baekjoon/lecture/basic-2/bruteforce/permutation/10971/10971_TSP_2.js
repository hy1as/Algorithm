"use strict";
const {readFileSync} = require("fs");
const [N, ...groupOfCostsString] = readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt").toString().split("\n");
const countOfCities = parseInt(N);
const groupOfCosts = groupOfCostsString.map(s => s.trim().split(" ").map(s => parseInt(s)));


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

function getCostOfPath(path, groupOfCosts) {
    let sum = 0;
    for (let i = 1; i < path.length; i++) {
        const prev = path[i - 1];
        const next = path[i];
        if (groupOfCosts[prev][next] === 0) {
            sum = Number.MAX_VALUE;
        } else {
            sum += groupOfCosts[prev][next];
        }
    }
    return sum;
}


const permutations = function* (cities) {
    2
    const permutation = [...cities].sort((a, b) => a - b);
    do {
        yield [...permutation, permutation[0]];
    } while (nextPermutation(permutation));
};

function solution(countOfCities, groupOfCosts) {
    const cities = Array.from({
        length: countOfCities
    }, (v, k) => k);
    let minValue = Number.MAX_VALUE;
    for (const path of permutations(cities)) {
        minValue = Math.min(minValue, getCostOfPath(path, groupOfCosts));
    }
    return minValue;
}


console.log(solution(countOfCities, groupOfCosts));