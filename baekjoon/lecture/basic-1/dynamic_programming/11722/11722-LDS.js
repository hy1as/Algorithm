"use strict";
const {readFileSync} = require("fs");
const [N, sequenceString] = readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt").toString().trim().split("\n");
const lengthOfSequence = parseInt(N);
const sequence = sequenceString.trim().split(" ").map((n) => parseInt(n));
sequence.unshift(0);
const D = Array.from({
    length: lengthOfSequence + 1
}, () => 1);
D[1] = 1;

for (let index = 2; index <= lengthOfSequence; index++) {
    let maxLengthIndex = null;
    for (let innerIndex = 1; innerIndex < index; innerIndex++) {
        if (sequence[innerIndex] > sequence[index]) {
            if (maxLengthIndex === null) {
                maxLengthIndex = innerIndex;
            } else {
                maxLengthIndex = D[maxLengthIndex] < D[innerIndex] ? innerIndex : maxLengthIndex;
            }
        }
    }
    if (maxLengthIndex === null) {
        D[index] = 1;
    } else {
        D[index] = D[maxLengthIndex] + 1;
    }
}

const answer = Math.max(...D);
console.log(answer);

