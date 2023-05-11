"use strict";
const {readFileSync} = require("fs");
const [N, signMatrixString] = readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt").toString().trim().split("\n");
const countOfNumber = parseInt(N);
const flattenSignMatrix = signMatrixString.split("");
const signMatrix = Array.from({
    length: countOfNumber
}, () => Array.from({
    length: countOfNumber
}, () => null));

let count = 0;
for (let i = 0; i < countOfNumber; i++) {
    for (let j = i; j < countOfNumber; j++) {
        switch (flattenSignMatrix[count++]) {
            case "+":
                signMatrix[i][j] = 1;
                break;
            case "-":
                signMatrix[i][j] = -1;
                break;
            case "0":
                signMatrix[i][j] = 0;
                break;
        }
    }
}

let answer = [];

function sum(arr, start, end) {
    const target = arr.slice(start, end + 1);
    return target.reduce((prev, val) => {
        return prev + val;
    }, 0);
}

function ok() {
    for (let i = 0; i < countOfNumber; i++) {
        for (let j = i; j < countOfNumber; j++) {
            const sign = signMatrix[i][j];
            const sumOfRange = sum(answer, i, j);
            if (sign === 0) {
                if (sumOfRange !== 0) {
                    return false;
                }
            } else if (sign > 0) {
                if (sumOfRange <= 0) {
                    return false;
                }
            } else {
                if (sumOfRange >= 0) {
                    return false;
                }
            }
        }
    }
    return true;
}

function check(index) {
    let sum = 0;
    for (let i = index; i >= 0; i--) {
        sum += answer[i];
        if (signMatrix[i][index] === 0) {
            if (sum !== 0) {
                return false;
            }
        } else if (signMatrix[i][index] < 0) {
            if (sum >= 0) {
                return false;
            }
        } else {
            if (sum <= 0) {
                return false;
            }
        }
    }
    return true;
}

function go(index) {
    if (index === countOfNumber) {
        return ok();
    } else {
        if (signMatrix[index][index] === 0) {
            answer[index] = 0;
            return check(index) && go(index + 1);
        } else {
            for (let i = 1; i <= 10; i++) {
                answer[index] = i * signMatrix[index][index];
                if (check(index) && go(index + 1)) {
                    return true;
                }
            }

        }
    }
    return false;
}

go(0);

console.log(answer.join(" "));


