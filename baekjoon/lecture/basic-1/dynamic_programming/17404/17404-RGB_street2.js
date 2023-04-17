"use strict";

const {readFileSync} = require("fs");
const [N, ...costRows] = readFileSync(process.platform === "linux" ? "/dev/stdin" :
    "input.txt").toString().trim().split("\n");

const countOfHouse = parseInt(N);
const streetBlocks = costRows.map(row => row.split(" ").map(n => parseInt(n)));
streetBlocks.unshift([0, 0, 0]);

const D = Array.from({
    length: countOfHouse + 1
}, () => [0, 0, 0]);

let answer = 1000 * 1000 + 1;
// 각각 첫번째 집이 R, G, B로 칠해진 경우의 수 ( 마지막 집은 해당 색 이외 선택 가능 )
for (let i = 0; i < 3; i++) {
    // 선택했을때 나머지 색상을 최소값 구하는 경우에서 제거 위해 첫번째 위치의 선택 색상 이외의 색상에 큰 값 할당
    for (let j = 0; j < 3; j++) {
        if (i === j) {
            D[1][j] = streetBlocks[1][j];

        } else {
            D[1][j] = 1000 * 1000 + 1;
        }
    }

    // 각 위치에서 최소 비용 기록
    for (let k = 2; k <= countOfHouse; k++) {
        D[k][0] = Math.min(D[k - 1][1], D[k - 1][2]) + streetBlocks[k][0];
        D[k][1] = Math.min(D[k - 1][0], D[k - 1][2]) + streetBlocks[k][1];
        D[k][2] = Math.min(D[k - 1][0], D[k - 1][1]) + streetBlocks[k][2];
    }

    // 현재까지의 최소값과 비교
    for (let l = 0; l < 3; l++) {
        if (i === l) {
            continue;
        }
        answer = Math.min(answer, D[countOfHouse][l]);
    }
}

console.log(answer);