"use strict";

const mod = 9901;
const {readFileSync} = require("fs");
const countOfBlocks = parseInt(readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt").toString().trim());
const D = Array.from({length: countOfBlocks + 1}, (v, k) => [0, 0, 0]);
D[1] = [1, 1, 1];

for (let i = 2; i <= countOfBlocks; i++) {
    // 경우의 수 세가지 : XX (둘다 없는 경우) => index 0 , OX (위에 케이지에만 존재) => index 1, XO (아래 케이지에만 존재) => index 2
    for (let j = 0; j < 3; j++) {
        if (j > 1) {
            // index 2 => XO : 아랫 케이지에 사자가 존재하는 경우 경우
            // 이전 블록에 XX, OX 두 가지 배치가 올수 있음
            D[i][j] = (D[i - 1][0] + D[i - 1][1]) % mod;
        } else if (j > 0) {
            // index 1 => OX : 위의 케이지에 사자가 존재하는 경우 경우
            // 이전 블록에 XX, XO 두 가지 배치가 존재할 수 있음
            D[i][j] = (D[i - 1][0] + D[i - 1][2]) % mod;
        } else {
            // index 0 => XX : 현재 케이지가 비어있는 경우
            // 이전 블록에 XX, OX, XO 등 모든 배치가 가능
            D[i][j] = (D[i - 1][0] + D[i - 1][1] + D[i - 1][2]) % mod;
        }
    }
}

const answer = D[countOfBlocks].reduce((prev, currentValue) => {
    return prev + currentValue;
}, 0);

console.log(answer % mod);