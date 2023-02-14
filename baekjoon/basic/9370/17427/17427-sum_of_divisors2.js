const fs = require('fs')
const N = parseInt(fs.readFileSync('input.txt').toString());
let answer = 0;
for (let i = 1; i <= N; i++) {
    // * 약수의 법칙 : N의 약수가 i 라면 i 의 갯수는 N/i 개 이다
    answer += Math.floor(N / i) * i
}
console.log(answer);