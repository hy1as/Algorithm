"use strict";

const {readFileSync} = require("fs");
const [N, ...problemString] = readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt").toString().trim().split("\n");
const countOfTestCases = parseInt(N);
const groupOfCases = [];
for (let i = 0; i < countOfTestCases * 3; i += 3) {
    groupOfCases.push(problemString.slice(i, i + 3));
}

const answer = [];

for (const c of groupOfCases) {
    // Sticker 그룹의 열의 개수
    const lengthOfStickers = parseInt(c[0].trim());
    // 각 위치를 떼어냈을 때의 최대값 기록 배열
    const D = Array.from({length: lengthOfStickers + 1}, (_, __) => [0, 0, 0]);
    // 위쪽 스티커들의 점수 배열
    const upperBound = c[1].trim().split(' ').map(n => parseInt(n));
    // 아래쪽 스티커들의 점수 배열
    const downsideBound = c[2].trim().split(' ').map(n => parseInt(n));
    // 기저조건 : 첫번째 스티커를 떼어냈을 때 점수
    // index 0 => 떼지 않음, 1 => 위쪽 스티커를 뗌, 2 => 아랫쪽 스티커를 뗌
    D[1] = [0, upperBound[0], downsideBound[0]];

    for (let i = 2; i <= lengthOfStickers; i++) {
        for (let j = 0; j < 3; j++) {
            // index 2 => 아랫쪽 스티커를 떼는 경우
            // 이전 스티커 열에서
            // 1. 떼지 않음 => index 0
            // 2. 위쪽을 떼어냄 => index 1
            // 두 가지 중 큰 상황에 + 떼어낸 스티커 점수 더함
            if (j > 1) {
                D[i][j] = Math.max(D[i - 1][0], D[i - 1][1]) + downsideBound[i - 1];
            } else if (j > 0) {
                // index 1 => 윗쪽 스티커를 떼는 경우
                // 이전 스티커 열에서
                // 1. 떼지 않음 => index 0
                // 2. 아래쪽을 떼어냄 => index 2
                // 두 가지 중 큰 상황에 + 떼어낸 스티커 점수 더함
                D[i][j] = Math.max(D[i - 1][0], D[i - 1][2]) + upperBound[i - 1];
            } else {
                // index 0 => 스티커를 떼지 않음
                // 이전 스티커 열에서
                // 1. 위쪽을 떼어냄 => index 1
                // 2. 아래쪽을 떼어냄 => index 2
                D[i][j] = Math.max(D[i - 1][1], D[i - 1][2]);
            }
        }
    }
    // 마지막 스티커를 떼어냈을 때 최대 점수를 기록
    answer.push(Math.max(...D[lengthOfStickers]));
}

console.log(answer.join("\n"));