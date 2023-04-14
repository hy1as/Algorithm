"use strict";

const {readFileSync} = require("fs");
const [T, ...cases] = readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt").toString().trim().split("\n").map(n => parseInt(n));

// 구해야할 최대 값 => 배열과 반복의 상한
const maxNumberInCases = Math.max(...cases);
const answer = [];
// 각 수의 경우의 수 기록 배열
const D = [];
D[0] = 1;

for (let i = 1; i <= maxNumberInCases; i++) {
    // 1을 더해서 수를 구하는 경우의수
    D[i] = D[i - 1];
    // 2를 더해서 수를 구하는 경우의수
    if (i > 1) {
        D[i] += D[i - 2];
    }
    // 3을 더해서 수를 구하는 경우의수
    if (i > 2) {
        D[i] += D[i - 3];
    }
    D[i] = D[i] % 1000000009;
}

for (const c of cases) {
    answer.push(D[c]);
}

console.log(answer.join("\n"));
