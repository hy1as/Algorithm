"use strict";

const {readFileSync} = require("fs");
let N = parseInt(readFileSync(process.platform === "linux" ? "/dev/stdin" :
    "input.txt").toString().trim());

let answer = 0;

let index = 1;
while (true) {
    let M = N / 10 ** index;
    if (M < 1) {
        answer += (N - 10 ** (index - 1)) * index + index;
        break;
    } else {
        answer += (10 ** index - 10 ** (index - 1)) * index;
    }
    index++;
}

console.log(answer);
