"use strict";

const {readFileSync} = require("fs");
const [conditionsString, groupOfNumbersString] = readFileSync(process.platform === "linux" ?
    "/dev/stdin" : "input.txt").toString().trim().split("\n").map(s => s.trim());
const [countOfNumbers, M] = conditionsString.split(" ").map(n => parseInt(n));
const groupOfNumbers = groupOfNumbersString.split(" ").map(n => parseInt(n)).sort((a, b) => a - b);
