"use strict";

const {readFileSync} = require("fs");
const [T, ...cases] = readFileSync(process.platform ===
                                   "linux" ? "/dev/stdin" : "input.txt")
    .toString().trim().split('\n').map(n => +n);

// 덧셈의 조합을 기록할 배열
const memo = [];

// 기저 조건 1 => 1, 2 => 2
memo[0] = 1;
memo[1] = 1;
memo[2] = 2;

const answer = [];

// 테스트 케이스 순회
for (let i = 0; i < T; i++) {
    const currentNumber = cases[i];
    // j => N 까지 순회하며 덧셈 조합 경우의 수 완성
    for (let j = 3; j <= currentNumber; j++) {
        // 해당 수의 덧셈 조합의 수를 완성 시켰던 경우
        if (memo[j] != null) {
            continue;
        }
        // 덧셈 조합 경우의 수
        // 1. 마지막이 +1 로 끝나는 경우
        // 1. 마지막이 +2 로 끝나는 경우
        // 1. 마지막이 +3 로 끝나는 경우
        memo[j] = memo[j - 1] + memo[j - 2] + memo[j - 3];
    }
    answer.push(memo[currentNumber]);
}

console.log(answer.join("\n"));



