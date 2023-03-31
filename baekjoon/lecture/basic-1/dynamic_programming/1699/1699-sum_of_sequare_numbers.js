"use strict";

const {readFileSync} = require("fs");
const N = parseInt(readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt").toString().trim());

// 각 자연수의 제곱수의 경우의 수 중 최소값을 기록할 배열
const memo = Array.from({
    length: N + 1
}, (_, __) => null);
memo[1] = 1;
for (let i = 2; i <= N; i++) {
    // 구하고자 하는 값의 최소 가짓수 변수
    let minimumCountOfSum = Number.MAX_VALUE;
    // 구하고자 하는 값이 제곱수와 같거나 작을 때까지 반복
    for (let j = 1; j ** 2 <= i; j++) {
        const squareNumber = j ** 2;
        // 구하고자 하는 값에서 제곱수를 뺀 수의 경우의 수중 최소 가짓수에 1자리 증가 
        minimumCountOfSum = minimumCountOfSum > memo[i - squareNumber] ? memo[i - squareNumber] + 1 : minimumCountOfSum;
    }
    memo[i] = minimumCountOfSum;
    console.log(i, memo[i]);
}


console.log(memo[N]);