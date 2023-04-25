"use strict";

const {readFileSync} = require("fs");
const [E, S, M] = readFileSync(process.platform === "linux" ? "/dev/stdin" :
    "input.txt").toString().trim().split(" ").map(n => parseInt(n));
let currentE = 1;
let currentS = 1;
let currentM = 1;
let year = 1n;

while (currentE !== E || currentS !== S || currentM !== M) {
    currentE = currentE < 15 ? currentE + 1 : 1;
    currentS = currentS < 28 ? currentS + 1 : 1;
    currentM = currentM < 19 ? currentM + 1 : 1;

    year++;
}

console.log(year.toString().replace('n', ''));