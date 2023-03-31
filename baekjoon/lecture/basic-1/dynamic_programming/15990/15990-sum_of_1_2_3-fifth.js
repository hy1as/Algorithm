"use strict";

const {readFileSync} = require("fs");
const [T, ...cases] = readFileSync(process.platform ===
                                   "linux" ? "/dev/stdin" : "input.txt")
    .toString().trim().split("\n").map(n => parseInt(n));

// Case 최대 값 => 기록 배열 생성 목적
const maxCaseNumber = Math.max(...cases);
const modNumber = 1000000009;
// 각 수별 덧셈 조합 경우의 수 기록 배열
const memo = Array.from({
    length: maxCaseNumber + 1
}, () => []);

// 기저 조건 초기화
memo[0] = [null, 0, 0, 0];
memo[1] = [null, 1, 0, 0];
memo[2] = [null, 0, 1, 0];
memo[3] = [null, 1, 1, 1];

// 답을 위한 배열
const memoForAnswer = [];
// 기저 조건 초기화
memoForAnswer[0] = 0;
memoForAnswer[1] = 1;
memoForAnswer[2] = 1;
memoForAnswer[3] = 3;

for (let j = 4; j <= maxCaseNumber; j++) {
    // 경우의 수
    // 1. 마지막 자리가 '1'이기 위해서는 마지막 이전 자리가 '2' 혹은 '3'으로 끝나는 경우만 가능
    memo[j][1] = (memo[j - 1][2] + memo[j - 1][3]) %
                 modNumber;
    // 2. 마지막 자리가 '2'이기 위해서는 마지막 이전 자리가 '1' 혹은 '3'으로 끝나는 경우만 가능
    memo[j][2] = (memo[j - 2][1] + memo[j - 2][3]) %
                 modNumber;
    // 3. 마지막 자리가 '3'이기 위해서는 마지막 이전 자리가 '1' 혹은 '2'로 끝나는 경우만 가능
    memo[j][3] = (memo[j - 3][1] + memo[j - 3][2]) %
                 modNumber;
    memoForAnswer[j] = (memo[j][1] + memo[j][2] + memo[j][3]) %
                       modNumber;
}

const answer = [];
for (const c of cases) {
    answer.push(memoForAnswer[c]);
}

console.log(answer.join("\n"));