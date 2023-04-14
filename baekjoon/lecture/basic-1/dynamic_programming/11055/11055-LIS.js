"use strict";

const {readFileSync} = require("fs");
const [N, sequenceString] = readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt").toString().trim().split("\n");

const lengthOfSequence = parseInt(N);
const sequence = sequenceString.split(" ").map(n => parseInt(n));
sequence.unshift(0);

const D = Array.from({
    length: lengthOfSequence + 1
}, () => 0);

D[1] = sequence[1];

for (let index = 2; index <= lengthOfSequence; index++) {
    let maximumSumIndex = null;
    for (let innerIndex = 1; innerIndex < index; innerIndex++) {
        // 부분 수열 생성 가능 여부 확인
        if (sequence[innerIndex] < sequence[index]) {
            // 이전 순회 중 부분 수열 생성 이력 없는 경우
            if (maximumSumIndex === null) {
                maximumSumIndex = innerIndex;
            } else {
                // 이전에 저장해놓은 최대합을 만들 수 있는 부분 수열과 현재 만들어진 부분 수열 비교
                maximumSumIndex = D[innerIndex] < D[maximumSumIndex] ? maximumSumIndex : innerIndex;
            }
        }
    }
    // 자기 자신으로만 이루어진 부분 수열 이외에 부분 수열을 생성하지 못한 경우
    if (maximumSumIndex === null) {
        D[index] = sequence[index];
        // 자신 이외의 다른 수를 포함한 부분 수열을 생성한 경우
    } else {
        D[index] = D[maximumSumIndex] + sequence[index];
    }
}

const answer = Math.max(...D);
console.log(answer);