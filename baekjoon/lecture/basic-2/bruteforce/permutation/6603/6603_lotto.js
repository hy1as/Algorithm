"use strict";
const {readFileSync} = require("fs");
const groupOfInput = readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt").toString().trim().split("\n").map(s => s.trim());
const groupOfTestCases = groupOfInput.slice(0, groupOfInput.length - 1).map(input => input.split(" ").map(s => parseInt(s)));

function nextPermutation(permutation) {
    let i = permutation.length - 1;
    while (0 < i && permutation[i - 1] >= permutation[i]) {
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

const permutations = function* (array) {
    let permutation = array.sort((a, b) => a - b);
    do {
        yield permutation;
    } while (nextPermutation(permutation));
};

function getBaseArray(k) {
    const arr = Array.from({
        length: k
    }, () => 0);
    for (let i = arr.length - 1; i > arr.length - 7; i--) {
        arr[i] = 1;
    }
    return arr;
}

function solution(groupOfTestCases) {
    const answer = [];
    for (const testCase of groupOfTestCases) {
        const [k, ...numbers] = testCase;
        let subAnswer = [];
        const arr = getBaseArray(k);
        for (const permutation of permutations(arr)) {
            let temp = [];
            for (let i = 0; i < permutation.length; i++) {
                if (permutation[i] === 1) {
                    temp.push(numbers[i]);
                }
            }
            subAnswer.push(temp);
        }
        subAnswer = subAnswer.sort((a, b) => {
            let d = 0;
            a.some((v, i) => d = v - b[i]);
            return d;
        });
        let str = subAnswer.map(el => el.join(" ")).join("\n");
        answer.push(str);
    }

    return answer.join("\n\n");
}

console.log(solution(groupOfTestCases));
