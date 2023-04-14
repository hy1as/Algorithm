"use strict";

const {readFileSync} = require("fs");
const HorizontalLength = parseInt(readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt").toString().trim());

const D = Array.from({
    length: HorizontalLength + 1
}, () => 0);
D[0] = 1;
for (let i = 2; i <= HorizontalLength; i += 2) {
    // 2줄짜리 조각마다 3개의 패턴 발생
    D[i] = D[i - 2] * 3;
    // 4개 부터 2줄씩 추가되며 2가지 패턴 추가 발생
    for (let j = 4; j <= i; j += 2) {
        D[i] += 2 * D[i - j];
    }
}

console.log(D[HorizontalLength]);
