"use strict";
const {readFileSync} = require("fs");
const [N, priceOfPacksString] = readFileSync(process.platform ===
                                             "linux" ? "/dev/stdin" : "input.txt")
    .toString().trim().split("\n");
const countOfCardsToBuy = parseInt(N);
const pricesOfPacks = priceOfPacksString.split(" ").map(n => parseInt(n));

// 각 개수당 최소 구매 금액 기록 배열
const memo = [];
// 기저조건 : 0개 구매시 0원
memo[0] = 0;

// 1개부터 N개 구매 상황까지 순회
for (let k = 1; k <= countOfCardsToBuy; k++) {
    // k개 구매시 최소 금액 변수
    let minimumPrice = Number.MAX_VALUE;
    // 1개들이 팩부터 k개들이 팩 구매 상황까지 순회
    for (let j = 1; j <= k; j++) {
        // 현재까지 최소 금액과 j개들이 팩 구매 상황시의 금액과 비교
        minimumPrice = Math.min(minimumPrice, memo[k - j] +
                                              pricesOfPacks[j - 1]);
    }
    // k개 구매시 최소 금액 확정
    memo[k] = minimumPrice;
}

console.log(memo[countOfCardsToBuy]);