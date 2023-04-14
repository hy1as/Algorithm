"use strict";

const {readFileSync} = require("fs");
const [countOfWines, ...groupOfWines] = readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt").toString().trim().split("\n").map(n => parseInt(n));
// 와인을 마셨을 때의 누적 점수 기록 배열
// D[n번째 와인의 경우][0:마시지 않음, 1: 한 잔 마심, 2: 두 잔 연속 마심]
const D = Array.from({
    length: countOfWines + 1
}, (_, __) => 0);

D[1] = groupOfWines[0];
D[2] = groupOfWines[0] + groupOfWines[1];

for (let i = 3; i <= countOfWines; i++) {
    
    // 발생할 수 있는 다음의 경우의 수 중 최대값을 찾는다.
    // 1. 마시지 않았을 때 => D[i - 1] 이전 와인까지 중 최대 점수
    // 2. 한 잔 연속으로 마셨을 때 => D[i - 1] + groupOfWines[i - 1] => 지금 와인을 마시고 직전 와인을 안 마신 경우 최대 점수
    // 3. 두 잔 연속으로 마셨을 때 => D[i - 2] + groupOfWines[i - 1] + groupOfWines[i - 2] => 직전 와인과 지금 와인을 마신 경우 최대 점수

    D[i] = Math.max(D[i - 1], D[i - 2] + groupOfWines[i - 1], D[i - 3] + groupOfWines[i - 1] + groupOfWines[i - 2]);
}

console.log(D[countOfWines]);