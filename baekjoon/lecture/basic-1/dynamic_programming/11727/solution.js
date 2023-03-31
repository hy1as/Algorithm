const {readFileSync} = require("fs");
const N = +readFileSync(process.platform ===
                        "linux" ? "/dev/stdin" : "input.txt").toString().trim();

// 조합의 경우의수를 기록할 배열
const memo = [];
// 기저조건 : 너비가 0일 때 1, 너비가 1일 때 1
memo[0] = 1;
memo[1] = 1;
// 기저 조건을 제외한 너비 2 ~ N일 때 까지 순회
for (let i = 2; i <= N; i++) {
// 조합의 발생 가능한 형태는
// 1. 마지막이 2 * 1 한 조각으로 이루어진 경우 => D[i-1]
// 2. 마지막이 1 * 2 두 조각으로 이루어진 경우 => D[i-2]
// 3. 마지막이 2 * 2 한 조각으로 이루어진 경우 => D[i-2]
    memo[i] = (memo[i - 1] + 2 * memo[i - 2]) % 10007;
}

console.log(memo[N]);
