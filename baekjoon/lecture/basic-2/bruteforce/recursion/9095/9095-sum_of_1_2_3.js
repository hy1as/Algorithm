"use strict";
const {readFileSync} = require("fs");
const [N, ...groupOfTestCases] = readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt").toString().trim().split("\n").map(s => parseInt(s));

function go(sum, target = []) {
    if (sum > target) {
        return 0;
    } else if (sum === target) {
        return 1;
    } else {
        return go(sum + 1, target) + go(sum + 2, target) + go(sum + 3, target);
    }

}


function solution(N, groupOfTestCases) {
    const answer = [];
    for (const testCase of groupOfTestCases) {
        answer.push(go(0, testCase));
    }
    return answer.join("\n");
}

console.log(solution(N, groupOfTestCases));
