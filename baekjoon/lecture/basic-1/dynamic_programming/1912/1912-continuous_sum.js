"use strict";

const {readFileSync} = require("fs");
const [N, sequenceString] = readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt").toString().trim().split("\n");

const lengthOfSequence = parseInt(N);
const sequence = sequenceString.split(" ").map(n => parseInt(n));

// 각 부분 합의 최대값 기록 배열
const memo = Array.from({length: lengthOfSequence}, () => null);

// 첫번째 인덱스에 위치한 원소는 자기 자신만으로 이루어지는 부부합만 가질 수 있음
memo[0] = sequence[0];

// sequence 의 길이 만큼 순회하며 각 index 에서 만들어지는 부분합들의 대소를 비교
for (let i = 1; i < N; i++) {
    // 자신 앞까지의 원소 최대합이 음수인 경우 자기 자신과의 합의 결과가 오히려 줄어드므로 자신만으로 이루어진
    // 부분합이 최대 합
    if (memo[i - 1] < 0) {
        memo[i] = sequence[i];
    } else {
        // 양수인 경우 자기 자신과 이전 부분합을 더함
        memo[i] = memo[i - 1] + sequence[i];
    }
}

// 기록된 각 위치에서의 최대 부분합들 중 최대값 반환
const answer = Math.max(...memo);

console.log(answer);

