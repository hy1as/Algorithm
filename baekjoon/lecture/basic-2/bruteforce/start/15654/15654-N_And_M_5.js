"use strict";

const {readFileSync} = require("fs");
const [condition, numbers] = readFileSync(process.platform === "linux" ? "/dev/stdin" :
    "input.txt"
).toString().trim().split("\n").map(s => s.trim());

const [countOfNumbers, M] = condition.split(" ").map(n => parseInt(n));
// 문자열, 숫자형 정렬 주의
const elementsOfSequence = numbers.split(" ").map(n => parseInt(n)).sort((a, b) => a - b);

function go(index, elements, countOfNumbers, M, check, groupOfSequence, currentSequence = []) {
    if (index === M) {
        groupOfSequence.push(currentSequence.join(" "));
        return;
    }
    for (let i = 0; i < countOfNumbers; i++) {
        if (check[i]) {
            continue;
        }
        check[i] = true;
        currentSequence[index] = elements[i];
        go(index + 1, elements, countOfNumbers, M, check, groupOfSequence, currentSequence);
        check[i] = false;
    }
}

function solution(elements, countOfNumbers, M) {
    const groupOfSequence = [];
    const check = Array.from({
        length: countOfNumbers
    }, () => false);
    go(0, elements, countOfNumbers, M, check, groupOfSequence);
    return groupOfSequence;
}

let answer = solution(elementsOfSequence, countOfNumbers, M);
console.log(answer.join("\n"));