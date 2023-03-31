// 수열 A가 주어졌을 때, 가장 긴 증가하는 부분 수열을 구하는 프로그램을 작성하시오.
//
// 예를 들어, 수열 A = {10, 20, 10, 30, 20, 50} 인 경우에 가장 긴 증가하는 부분 수열은 A = {10, 20, 10, 30, 20, 50} 이고, 길이는 4이다.

const fs = require('fs')
const [length, sequenceString] = fs.readFileSync(process.platform ===
                                                 'linux' ? '/dev/stdin' : 'input.txt')
                                   .toString().trim().split('\n')
const numberArray = sequenceString.split(' ').map(n => +n)
// 각 수열의 원소 A[n]은 자기 자신 혼자 수열이 될 수 있다.
const memo = Array.from({
    length: length
}, (v, k) => 1)

// 첫번째 원소 부터 순회하면서
for (let i = 0; i < length; i++) {
    const currentNumber = numberArray[i]
    // 현재 원소의 이전 원소들을 순회하면서
    for (let j = 0; j <= i; j++) {
        // 지금까지 만들어진 수열들 중 현재 원소가 마지막 수열의 원소보다 큰 수열의 찾아
        if (numberArray[j] < currentNumber && memo[i] < memo[j] + 1) {
            // 해당 수열의 길이에서 +1 시켜 현재 상태를 저장한다. ( 만들어진 수열들 중 가장 큰 값 저장 )
            memo[i] = memo[j] + 1;
        }
    }
}

console.log(Math.max(...memo))
