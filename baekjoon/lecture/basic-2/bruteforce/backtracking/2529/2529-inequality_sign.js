"use strict";
const {readFileSync} = require("fs");
const [countOfSignString, groupOfSignString] = readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt").toString().trim().split("\n");
const countOfSign = parseInt(countOfSignString);
const groupOfSign = groupOfSignString.split(" ");

let maxValue = Number.MIN_VALUE;
let minValue = Number.MAX_VALUE;
const answer = [maxValue.toString(), minValue.toString()];

function check(sequence) {
    if (sequence.length < 2) {
        return true;
    } else {
        const sign = groupOfSign[sequence.length - 2];
        if (sign === ">") {
            return sequence[sequence.length - 1] < sequence[sequence.length - 2];
        } else {
            return sequence[sequence.length - 1] > sequence[sequence.length - 2];
        }
    }
}

function go(countOfNumber, currentSequence = []) {
    if (countOfNumber === countOfSign + 1) {
        if (check(currentSequence)) {
            let integerString = currentSequence.join("");
            let integer = parseInt(integerString);
            maxValue = Math.max(maxValue, integer);
            minValue = Math.min(minValue, integer);
            if (integer === maxValue) {
                answer[0] = integerString;
            }
            if (integer === minValue) {
                answer[1] = integerString;
            }
        }
    } else {
        if (check(currentSequence)) {
            for (let i = 0; i <= 9; i++) {
                if (!currentSequence.includes(i)) {
                    go(countOfNumber + 1, [...currentSequence, i]);
                }
            }
        }
    }
}

go(0);
console.log(answer.join("\n"));
