"use strict";
const {readFileSync} = require("fs");
const [N, pricesOfPacksString] = readFileSync(process.platform ===
                                              "linux" ? "/dev/stdin" : "input.txt")
    .toString().trim().split("\n");
const countOfCardToBuy = parseInt(N);
const pricesOfPacks = pricesOfPacksString.trim().split(" ")
                                         .map(n => parseInt(n));

// 각 구매 갯수별 최대 금액 기록 배열
const memo = [];
// 기저 조건 : 0개 구매 시 0원
memo[0] = 0;

// 1개 구매 부터 N개 구매까지 순회
for (let k = 1; k <= countOfCardToBuy; k++) {
    // k개 구매시 최대 금액 변수
    let maximumPrice = 0;
    // 1개들이 팩부터 N개들이 팩까지 구매하는 상황 순회
    for (let j = 1; j <= k; j++) {
        // (i-j) 개 구매 상황에서 j개들이 팩 구매시의 가격
        const price = memo[k - j] + pricesOfPacks[j - 1];
        // 최대값 비교
        maximumPrice = Math.max(price, maximumPrice);
    }
    // k개 구매할 때의 최대 가격
    memo[k] = maximumPrice;
}

console.log(memo[countOfCardToBuy]);

