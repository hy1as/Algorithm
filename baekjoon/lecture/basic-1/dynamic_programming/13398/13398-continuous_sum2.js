"use strict";

const {readFileSync} = require("fs");
const [N, sequenceString] = readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt").toString().trim().split("\n");
const lengthOfSequence = parseInt(N);
const sequence = sequenceString.trim().split(" ").map(n => parseInt(n));


const DL = [];
const DR = [];

// 처음(왼쪽) 부터 순차적으로 더 할때 각 위치에서의 최대값
for (let index = 0; index < lengthOfSequence; index++) {
    DL[index] = sequence[index];
    if (index === 0) {
        continue;
    }
    if (DL[index] < DL[index - 1] + sequence[index]) {
        DL[index] = DL[index - 1] + sequence[index];
    }
}

// 뒤(오른쪽) 부터 순차적으로 더 할때 각 위치에서의 최대값
for (let index = lengthOfSequence - 1; -1 < index; index--) {
    DR[index] = sequence[index];
    if (index === lengthOfSequence - 1) {
        continue;
    }
    if (DR[index] < DR[index + 1] + sequence[index]) {
        DR[index] = DR[index + 1] + sequence[index];
    }
}
let answer = Math.max(...DL);

// 현재 위치의 값을 제외한 나머지 원소들의 합 중 최대값 
for (let index = 1; index < lengthOfSequence - 1; index++) {
    if (answer < DL[index - 1] + DR[index + 1]) {
        answer = DL[index - 1] + DR[index + 1];
    }
}
console.log(answer);