const fs = require('fs')
const N = parseInt(fs.readFileSync('input.txt').toString());
let answer = 0;
for (let k = 1; k <= N; k++) {
    // * 약수의 법칙 : N의 약수가 k 라면 k 의 갯수는 N/k 개 이다
    // => N 이하 자연수인 k를 약수로 갖는 수의 갯수 = N이하인 K의 배수의 갯수 => Math.floor(N/k)
    answer += Math.floor(N / k) * k
}
console.log(answer);