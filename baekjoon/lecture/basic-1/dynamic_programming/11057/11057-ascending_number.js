"use strict";

const mod = 10007;

const {readFileSync} = require("fs");
const N = parseInt(readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt").toString().trim());

// 마지막 자리 수 별 경우의 수 기록 배열
// D[길이][마지막 자릿수]
const D = Array.from({
    length: N + 1
}, (_, __) => {
    return Array.from({
        length: 10
    }, (_, __) => 0);
});

// 한 자리의 경우 모두 1가지 경우의 수를 가짐 ( * 수가 0으로 시작 가능 )
D[1] = Array.from({length: 10}, (_, __) => 1);

// 점화식 => D[N][k] = D[N-1][k] + D[N-1][k-1] + ... D[N-1][0]
for (let i = 2; i <= N; i++) {
    for (let j = 0; j < 10; j++) {
        for (let k = j; k >= 0; k--) {
            D[i][j] = (D[i][j] + D[i - 1][j - k]) % mod;
        }
    }
}

const answer = D[N].reduce((prev, current) => {
    return (prev + current) % mod;
}, 0);

console.log(answer);
