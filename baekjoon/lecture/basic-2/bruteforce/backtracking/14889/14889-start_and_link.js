"use strict";
const {readFileSync} = require("fs");
const [countOfPeopleString, ...tableString] = readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt").toString().trim().split("\n");
const countOfPeople = parseInt(countOfPeopleString);
const table = tableString.map(row => row.split(" ").map(power => parseInt(power)));

let answer = Number.MAX_VALUE;

function go(n, a, b) {
    if (a.length > countOfPeople / 2 || b.length > countOfPeople / 2) {
        return;
    } else if (a.length + b.length === countOfPeople) {
        let sumOfA = 0;
        let sumOfB = 0;
        for (let i = 0; i < countOfPeople / 2; i++) {
            for (let j = 0; j < countOfPeople / 2; j++) {
                if (i === j) {
                    continue;
                }
                sumOfA += table[a[i]][a[j]];
                sumOfB += table[b[i]][b[j]];
            }
        }
        answer = Math.min(answer, Math.abs(sumOfA - sumOfB));
    } else {
        go(n + 1, [...a, n], b);
        go(n + 1, a, [...b, n]);
    }
}

go(0, [], []);

console.log(answer);

