"use strict";
const DAY = 0;
const PAY = 1;

const {readFileSync} = require("fs");
const [N, ...groupOfRows] = readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt").toString().trim().split("\n");
const remainDays = parseInt(N);
const days = groupOfRows.map(r => parseInt(r.split(" ")[0]));
const pays = groupOfRows.map(r => parseInt(r.split(" ")[1]));
let answer = 0;

function go(currentDay, sum) {
    // 실제 마지막 날은  (remainDays - 1 일)
    if (currentDay > remainDays) {
        return;
        // 실제 마지막 날은  (remainDays - 1 일)
    } else if (currentDay === remainDays) {
        answer = Math.max(answer, sum);
        return;
    }
    // 일을 하는 경우
    go(currentDay + days[currentDay], sum + pays[currentDay]);
    // 일을 하지 않는 경우
    go(currentDay + 1, sum);
}


function solution() {
    // 시작 하는 날짜를 Zero-based 로 볼때
    go(0, 0);
}

solution(remainDays);
console.log(answer);
