"use strict";

const {readFileSync} = require("fs");
const N = parseInt(readFileSync(process.platform ===
                                "linux" ? "/dev/stdin" : "input.txt").toString()
                                                                     .trim());
const modValue = 1000000000;

// 각 길이의 자리별 경우의 수 기록 배열
const memo = Array.from({
    length: N + 1
}, (_, __) => []);
// 기저 조건 : 수열의 길이가 1인 경우
memo[1] = [0, 1, 1, 1, 1, 1, 1, 1, 1, 1];

for (let i = 2; i <= N; i++) {
    // 0 ~ 9 까지 순회하며 자리별 경우의 수 계산
    for (let j = 0; j <= 9; j++) {
        // 1. 0의 경우 이전 자리가 '1'만 가능 
        if (j < 1) {
            memo[i][j] = memo[i - 1][1];
            // 2. 9의 경우 이전 자리가 '8'만 가능
        } else if (8 < j) {
            memo[i][j] = memo[i - 1][8];
        } else {
            // 3. 각 자리는 이전 자리 수가 -1 혹은 +1 인 경우가 발생 가능
            memo[i][j] = (memo[i - 1][j - 1] + memo[i - 1][j + 1]) % modValue;
        }
    }
}

// 수열의 경우의 수 = 마지막 자리에 올 수 있는 경우의 수들의 합
const answer = memo[N].reduce((previousValue, currentValue) => {
    return previousValue + currentValue;
}, 0);

console.log(answer % modValue);


