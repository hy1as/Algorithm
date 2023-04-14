"use strict";

const {readFileSync} = require("fs");
const [N, ...costString] = readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt").toString().trim().split("\n");
const countOfHouse = parseInt(N);
const costs = costString.map(line => line.trim().split(" ").map(n => parseInt(n)));

const D = Array.from({
    length: countOfHouse + 1
}, (v, k) => {
    return Array.from({
        length: 3
    }, (v, k) => 0);
});
D[1] = costs[0];
for (let i = 2; i <= countOfHouse; i++) {
    for (let j = 0; j < 3; j++) {
        if (j === 0) {
            D[i][j] = Math.min(D[i - 1][1], D[i - 1][2]) + costs[i - 1][j];
        } else if (j === 1) {
            D[i][j] = Math.min(D[i - 1][0], D[i - 1][2]) + costs[i - 1][j];
        } else {
            D[i][j] = Math.min(D[i - 1][0], D[i - 1][1]) + costs[i - 1][j];
        }
    }
}

console.log(Math.min(...D[countOfHouse]));