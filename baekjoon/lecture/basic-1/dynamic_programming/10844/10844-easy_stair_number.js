const fs = require('fs')
const digit = +fs.readFileSync(process.platform ===
                               'linux' ? '/dev/stdin' : 'input.txt').toString()
                 .trim()
const modValue = 1000000000
const memo = Array.from({
    length: digit + 1,
}, (v, k) => Array.from({
    length: 10
}, (v, k) => 0))
// 기저 조건이 될 한자리만 존재하는 경우를 초기화
// * 0은 첫째자리에 들어갈 수 없음
memo[1][0] = 0
memo[1][1] = 1
memo[1][9] = 1
for (let i = 2; i < 9; i++) {
    memo[1][i] = 1
}

// 자리수가 i일 때의 가능한 경우의 수를 D[i]라고 정의한다
// D[i] 중 마지막이 정수 j로 끝나는 경우의 수를 D[i][j]로 정의한다
// D[i][j]는 이전 마지막 자릿수가 각각 정수 j-1, j+1로 끝났을 때 나올수 있는 경우의 수이므로
// 점화식은 D[i][j] = D[i-1][j-1] + D[i-1][j+1] 로 표현할 수 있다.
// 단 0 <= j < 10 이기 때문에 j가 0, 9 일 때는 올수있는 마지막 자리가 1, 8 만 가능하기 때문에 별도 처리 해준다.

for (let i = 2; i <= digit; i++) {
    for (let j = 0; j <= 9; j++) {
        if (j > 0) memo[i][j] += memo[i - 1][j - 1]
        if (j < 9) memo[i][j] += memo[i - 1][j + 1]
        memo[i][j] %= modValue
    }
}

let answer = 0
for (let i = 0; i <= 9; i++) {
    answer += memo[digit][i]
}

console.log(answer % modValue)


