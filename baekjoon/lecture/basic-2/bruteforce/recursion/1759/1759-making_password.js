"use strict";
const {readFileSync} = require("fs");
const [conditions, groupOfCandidatesString] = readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt").toString().trim().split("\n").map(s => s.split(" "));
const [lengthOfPassword, countOfCandidates] = conditions.map(s => parseInt(s.trim()));
const groupOfCandidates = groupOfCandidatesString.map(s => s.trim()).sort();

const vow = ['a', 'e', 'i', 'o', 'u'];

function canUse(password) {
    let vowCount = 0;
    let cosCount = 0;
    for (let i = 0; i < password.length; i++) {
        if (vow.includes(password[i])) {
            vowCount++;
        } else if (!vow.includes(password[i])) {
            cosCount++;
        }
    }
    return vowCount >= 1 && cosCount >= 2;
}

function go(index, groupOfCandidates, length, groupOfPassword, currentPassword = []) {
    if (index > length) {
        return;
    } else if (index === length) {
        if (canUse(currentPassword)) {
            groupOfPassword.push(currentPassword.join(""));
        }
    } else {
        for (let i = 0; i < groupOfCandidates.length; i++) {
            if (0 < index && currentPassword[index - 1] >= groupOfCandidates[i]) {
                continue;
            }
            go(index + 1, groupOfCandidates, length, groupOfPassword, [...currentPassword, groupOfCandidates[i]]);
        }
    }
}

function solution(length, countOfCandidates, groupOfCandidates) {
    const answer = [];
    go(0, groupOfCandidates, length, answer);
    return answer.join("\n");
}

console.log(solution(lengthOfPassword, countOfCandidates, groupOfCandidates));

