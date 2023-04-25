"use strict";

const {readFileSync} = require("fs");
const [N, ...cases] = readFileSync(process.platform === "linux" ? "/dev/stdin" :
    "input.txt").toString().trim().split("\n");
const countOfTestCases = parseInt(N);
const groupOfCases = cases.map((c) => c.trim().split(" ").map(n => parseInt(n)));

function getLCM(a, b) {
    let cloneA = a;
    let cloneB = b;
    while (true) {
        if (cloneB === 0) {
            break;
        }
        let r = cloneA % cloneB;
        cloneA = cloneB;
        cloneB = r;
    }
    return a * b / cloneA;
}

const answer = [];

function getNextYear(M, N, currentX, currentY) {
    let x = 1;
    let y = 1;
    if (currentX + 1 <= M) {
        x = currentX + 1;
    }
    if (currentY + 1 <= N) {
        y = currentY + 1;
    }
    return [x, y];
}

for (const c of groupOfCases) {
    const [M, N, x, y] = c;
    let currentYear = 1;
    let [currentX, currentY] = [1, 1];
    const lastYear = getLCM(M, N);
    while (true) {
        if (currentYear > lastYear) {
            answer.push(-1);
            break;
        } else {
            if (currentX === x && currentY === y) {
                answer.push(currentYear);
                break;
            } else {
                [currentX, currentY] = getNextYear(M, N, currentX, currentY);
                currentYear++;
            }
        }
    }
}

console.log(answer.join("\n"));