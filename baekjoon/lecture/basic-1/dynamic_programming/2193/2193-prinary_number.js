"use strict";
const {readFileSync} = require("fs");
const N = parseInt(readFileSync(process.platform ===
                                "linux" ? "/dev/stdin" : "input.txt").toString()
                                                                     .trim());
// 1이 연속으로 나올 수 없는 조건 때문에 마지막이 0이 나오는 경우와 1이 나오는 경우를 
// 분리하여 풀이
const memo = Array.from({
    length: N + 1
}, () => []);

memo[0] = [0, 0];
memo[1] = [0, 1];
memo[2] = [1, 0];
// N의 범위가 0 ~ 90 까지 일 때 number 자료형의 크기를 넘어 BigInt 사용 필요
memo[3] = [1n, 1n];

for (let i = 4; i <= N; i++) {
    // 마지막이 0으로 끝나는 경우 이전 자리에 올 수 있는 수는 0과 1
    memo[i][0] = memo[i - 1][1] + memo[i - 1][0];
    // 마지막이 1로 끝나는 경우 이전 자리에 올 수 있는 수는 0
    memo[i][1] = memo[i - 1][0];
}

console.log((memo[N][0] + memo[N][1]).toString());

