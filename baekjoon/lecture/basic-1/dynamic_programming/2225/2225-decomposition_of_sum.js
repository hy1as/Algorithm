"use strict";

const {readFileSync} = require("fs");
const [N, k] = readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt").toString().trim().split(" ").map(n => parseInt(n));

// 합 분해 경우의 수 기록 배열
// D[k][N]
const D = Array.from({
    length: k + 1
}, (v, k) => Array.from({
    length: N + 1
}, (v, k) => 0));

D[0][0] = 1;

// k => 합 연산의 원소 개수
for (let i = 1; i <= k; i++) {
    // N => 합 연산의 결과 수
    for (let j = 0; j <= N; j++) {
        // l => 마지막 합연산의 원소
        for (let l = 0; l <= j; l++) {
            D[i][j] += D[i - 1][j - l];
        }
        D[i][j] = D[i][j] % 1000000000;
    }
}

console.log(D[k][N]);