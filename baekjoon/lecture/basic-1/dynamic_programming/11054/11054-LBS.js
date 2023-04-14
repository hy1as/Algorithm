"use strict";

const {readFileSync} = require("fs");
const [N, sequenceString] = readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt").toString().trim().split("\n");

const lengthOfSequence = parseInt(N);
const sequence = sequenceString.split(" ").map(n => parseInt(n));

// 각 위치 별 가장 긴 바이토닉 부분 수열 길이 기록 배열
const D = Array.from({
    length: lengthOfSequence
}, (_, __) => [0, 0]);

// 첫번째 위치에서는 자기 자신을 원소로 하는 부분 수열이 가장 긴 수열
D[0][0] = 1;
D[0][1] = 1;

// 전체 수열 순차적 순환
for (let index = 1; index < lengthOfSequence; index++) {
    let maxAscendingLength = 1;
    let maxDescendingLength = 1;
    for (let innerIndex = 0; innerIndex < index; innerIndex++) {
        // 오름차순인 경우
        if (sequence[innerIndex] < sequence[index]) {
            const currentLength = D[innerIndex][0] + 1;
            maxAscendingLength = maxAscendingLength < currentLength ? currentLength : maxAscendingLength;
            // 내림차순인 경우
        } else if (sequence[innerIndex] > sequence[index]) {
            const currentAscendingLength = D[innerIndex][0] + 1;
            const currentDescendingLength = D[innerIndex][1] + 1;
            maxDescendingLength = maxDescendingLength < currentAscendingLength ? currentAscendingLength : maxDescendingLength;
            maxDescendingLength = maxDescendingLength < currentDescendingLength ? currentDescendingLength : maxDescendingLength;
        }
    }

    D[index][0] = maxAscendingLength;
    D[index][1] = maxDescendingLength;
}

let answer = 1;
for (let i = 0; i < lengthOfSequence; i++) {
    answer = Math.max(answer, D[i][0], D[i][1]);
}

console.log(answer);
