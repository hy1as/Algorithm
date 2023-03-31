const {readFileSync} = require("fs");
const N = +readFileSync(process.platform ===
                        "linux" ? "/dev/stdin" : "input.txt").toString().trim();
// 조합의 수를 기록할 배열
const memo = [];
// 기저조건 : D[0] = 1, D[1] = 1
memo[0] = 1;
memo[1] = 1;
// 기저조건을 제외한 2 ~ N 까지 순회
for (let i = 2; i <= N; i++) {
// 가장 마지막 조각이
// 1. 마지막이 2 * 1 한 조각으로 이루어진 경우 => D[i-1]
// 2. 마지막이 1 * 2 두 조각으로 이루어진 경우 => D[i-2]
// 3. 마지막이 2 * 2 한 조각으로 이루어진 경우 => D[i-2]
    memo[i] = (memo[i - 1] + memo[i - 2]) % 10007;
}

console.log(memo[N]);



