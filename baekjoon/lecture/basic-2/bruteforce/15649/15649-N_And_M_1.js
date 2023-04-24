"use strict";
const {readFileSync} = require("fs")
const [N, M] = readFileSync(process.platform === "linux" ? "/dev/stdin" :
    "input.txt").toString().trim().split(" ").map(n => parseInt(n));

function go(index, N, M, check, anw, currentSequence = []) {
    // 기저 조건
    if (index === M) {
        anw.push(currentSequence.join(" "));
        return;
    }
    // 순차적으로 가능한 자연수 사용
    for (let i = 1; i <= N; i++) {
        // 이미 사용한 숫자인 경우
        if (check[i]) {
            continue;
        }
        // 해당 숫자 사용 체크
        check[i] = true;
        // 해당 숫자 사용
        currentSequence[index] = i;
        // 다음 인덱스에 함수 호출
        go(index + 1, N, M, check, anw, currentSequence);
        // 해당 숫자 사용 체크 해제
        check[i] = false;
    }
}

function solution(N, M) {
    // 최종 답
    const anw = [];
    // 현재 사용 숫자 기록 배열
    const check = Array.from({
        length: N + 1
    }, () => false);
    // 재귀 시작
    go(0, N, M, check, anw);
    return anw;
}

const answer = solution(N, M);
console.log(answer.join("\n"));