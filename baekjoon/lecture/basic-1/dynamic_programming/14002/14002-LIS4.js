"use strict";

const {readFileSync} = require("fs");
const [N, sequenceString] = readFileSync(process.platform ===
                                         "linux" ? "/dev/stdin" : "input.txt")
    .toString().trim().split("\n");
const lengthOfSequence = parseInt(N);
const sequence = sequenceString.split(" ").map(n => parseInt(n));

const lengthMemo = [];
const throughMemo = [];

// 최종 답으로 제출할 가장 긴 부분 수열의 인덱스
let globalMaxLengthIndex = 0;

for (let i = 0; i < lengthOfSequence; i++) {
    // 가장 긴 부분 수열일 때의 길이 변수 => 자기 자신으로 초기화
    let maxLength = 1;
    // 가장 긴 부분 수열일 때 직전 경유한 부분 수열 원소 => 없음으로 초기화
    let maxLengthIndex = null;
    for (let j = 0; j < i; j++) {
        if (sequence[i] > sequence[j]) {
            const subSequenceLength = lengthMemo[j] + 1;
            // 지금 까지 최고 길이 부분수열보다 긴 경우
            // 길이 및 직전 경유 원소 갱신
            if (subSequenceLength > maxLength) {
                maxLength = subSequenceLength;
                maxLengthIndex = j;
            }
        }
    }
    // 가장 긴 부분 수열일 때의 길이
    lengthMemo[i] = maxLength;
    // 가장 긴 부분 수열일 때 직전 경유한 부분 수열 원소
    throughMemo[i] = maxLengthIndex;
    // 가장 긴 부분 수열의 마지막 원소의 인덱스 갱신
    if (maxLength > lengthMemo[globalMaxLengthIndex]) {
        globalMaxLengthIndex = i;
    }
}

// 수열 출력 위한 역산용 인덱스 변수
let nextThroughIndex = globalMaxLengthIndex;

// 답 제출용 배열
const answerSubSequence = [];

do {
    // 수열 원소들을 역산하여 찾아가며 배열에 추가
    answerSubSequence.push(sequence[nextThroughIndex]);
    nextThroughIndex = throughMemo[nextThroughIndex];
} while (nextThroughIndex !== null);

console.log(lengthMemo[globalMaxLengthIndex] + "\n" +
            answerSubSequence.reverse().join(" "));
