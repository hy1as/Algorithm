"use strict";

const {readFileSync} = require("fs");
const [N, sequenceString] = readFileSync(process.platform ===
                                         "linux" ? "/dev/stdin" : "input.txt")
    .toString().trim().split("\n");
const countOfSequenceElements = parseInt(N);
const sequence = sequenceString.split(" ").map(n => parseInt(n));
const memo = [];
memo[0] = 1;

// 부분 수열을 만들기 위해서는 해당 숫자의 앞에 위치한 숫자 중 자신 보다 작은 수로 구성된다.
// 앞에서부터 차례로 순회하며 이미 만들어진 수열 중 마지막에 온 숫자가 자신보다 작은 수열을 찾고
// 그 수열들 중 가장 긴것에 현재 원소를 붙여주면 오름차순으로 부분 수열이 만들어진다.

for (let i = 1; i < countOfSequenceElements; i++) {
    // 현재 원소로 끝나는 최고 길이 부분 수열 => 자신만으로 이루어진 수열이 만들어지는 경우로 초기화
    let maxLength = 1;
    for (let j = 0; j < i; j++) {
        // 현재 원소가 부분수열의 마지막 자리수 보다 큰 경우 부분 수열 가능
        if (sequence[i] > sequence[j]) {
            maxLength = maxLength > memo[j] + 1 ? maxLength : memo[j] + 1;
        }
    }
    memo[i] = maxLength;
}

const maxLengthOfSubSequences = Math.max(...memo);
console.log(maxLengthOfSubSequences);

