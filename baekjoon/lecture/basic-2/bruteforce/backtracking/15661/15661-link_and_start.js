"use strict";
const {readFileSync} = require("fs");
const [N, ...tableRowStrings] = readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt").toString().trim().split("\n").map(s => s.trim());
const countOfPeople = parseInt(N);
const table = tableRowStrings.map(s => s.trim().split(" ").map(s => parseInt(s)));

let answer = Number.MAX_VALUE;

function getSum(team) {
    let ret = 0;
    for (let i = 0; i < team.length; i++) {
        for (let j = 0; j < team.length; j++) {
            if (i === j) {
                continue;
            }
            ret += table[team[i]][team[j]];
        }
    }
    return ret;
}

function go(index, a = [], b = []) {
    if (index === countOfPeople) {
        if (a.length < 1 || b.length < 1) {
            return;
        }
        const sumOfATeam = getSum(a);
        const sumOfBTeam = getSum(b);
        const diff = Math.abs(sumOfATeam - sumOfBTeam);
        answer = Math.min(answer, diff);
    } else {
        go(index + 1, [...a, index], b);
        go(index + 1, a, [...b, index]);
    }
}

go(0);

console.log(answer);



