"use strict";

const {readFileSync} = require("fs");
const [N, ...triangleString] = readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt").toString().trim().split("\n").map(s => s.trim());

const levelOfTriangle = parseInt(N);
const triangle = triangleString.map((levelLine) => levelLine.split(" ").map((n => parseInt(n))));
// 이동 상황별 점수 기록 배열 => D[현재 레벨][위치]
const D = Array.from({length: N + 1}, (_, __) => []);
// 기저 조건 레벨 1 ( 최상단 )
D[1][0] = triangle[0][0];

// 모든 레벨 순회
for (let level = 2; level <= levelOfTriangle; level++) {
    // 해당 레벨 내의 모든 index(위치) 순회
    let currentLevelLength = triangle[level - 1].length;
    for (let index = 0; index < currentLevelLength; index++) {
        // 좌측 대각선 역산이 불가능한 0의 경우 예외 처리
        if (index === 0) {
            D[level][index] = D[level - 1][index] + triangle[level - 1][index];
            // 우측 대각선 역산이 불가능한 마지막 인덱스의 경우 예외 처리
        } else if (index === currentLevelLength - 1) {
            D[level][index] = D[level - 1][index - 1] + triangle[level - 1][index];
        } else {
            // 좌측 경로 우측 경로 중 더 높은 비용 선택
            D[level][index] = Math.max(D[level - 1][index], D[level - 1][index - 1]) + triangle[level - 1][index];
        }
    }
}

const answer = Math.max(...D[levelOfTriangle]);

console.log(answer);