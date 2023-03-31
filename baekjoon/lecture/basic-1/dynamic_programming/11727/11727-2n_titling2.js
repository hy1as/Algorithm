// 2×n 직사각형을 1×2, 2×1과 2×2 타일로 채우는 방법의 수를 구하는 프로그램을 작성하시오.
//
// 아래 그림은 2×17 직사각형을 채운 한가지 예이다.

const fs = require('fs')
const input = +fs.readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt').toString().trim()
const memo = [];
memo[1] = 1
memo[2] = 3

for(let i = 3; i <= input; i++) {
    memo[i] = memo[i - 1] + memo[i - 2] + memo[i - 2]
    memo[i] %= 10007
}

console.log(memo[input])