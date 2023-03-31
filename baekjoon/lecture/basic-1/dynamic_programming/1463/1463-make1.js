const {readFileSync} = require('fs');
const N = +readFileSync(process.platform ===
                        'linux' ? '/dev/stdin' : 'input.txt').toString().trim();

// 각 수를 입력했을 때의 최소 경우의 수 기록 배열
const memo = [];
// 기저조건 : '1'
memo[1] = 0;

for (let i = 2; i <= N; i++) {
    // +1 을 통해 만들어지는 N의 합 조합의 수
    memo[i] = memo[i - 1] + 1;
    // N이 2로 나누어지는 수라면
    if (i % 2 === 0) {
        // 나누기 2를 통해 만들어지는 N의 합 조합의 수와 저장된 합 조합 경우의 수 비교 후 최소값 기록
        memo[i] = Math.min(memo[i], (memo[i / 2]) + 1);
    }
    if(i % 3 === 0) {
        // 나누기 3를 통해 만들어지는 N의 합 조합의 수와 저장된 합 조합 경우의 수 비교 후 최소값 기록
        memo[i] = Math.min(memo[i], (memo[i / 3]) + 1);
    }
}

console.log(memo[N]);

