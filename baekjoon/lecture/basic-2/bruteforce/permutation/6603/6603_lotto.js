"use strict";
const {readFileSync} = require("fs");
const groupOfInput = readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt").toString().split("\n");
const groupOfTestCases = groupOfInput.slice(0, groupOfInput.length - 1).map(s => s.trim().split(" ").map(n => parseInt(n)));


function pick(index, array, M, check, groupOfSequence, sequence = []) {
    if (index === M) {
        groupOfSequence.add([...sequence].join(" "));
        return;
    }
    for (let i = 0; i < array.length; i++) {
        if (check[i] || (index > 0 && sequence[index - 1] > array[i])) {
            continue;
        }
        check[i] = true;
        sequence[index] = array[i];
        pick(index + 1, array, M, check, groupOfSequence, sequence);
        check[i] = false;
    }
}

function solution(groupOfTestCases) {
    const answer = [];
    for (const testCase of groupOfTestCases) {
        const [k, ...groupOfNumbers] = testCase;
        const set = new Set();
        const check = Array.from({
            length: k + 1
        }, () => false);
        pick(0, groupOfNumbers, 6, check, set);
        answer.push([...set].join("\n"));
    }
    return answer.join("\n\n");
}

console.log(solution(groupOfTestCases));

