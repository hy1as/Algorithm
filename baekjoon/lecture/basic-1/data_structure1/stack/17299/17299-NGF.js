const fs = require('fs')
const [T, numbersString] = fs.readFileSync(process.platform ===
                                           'linux' ? '/dev/stdin' : 'input.txt')
                             .toString().trim().split('\n')
// 입력 받은 수의 개수
const countOfNumbers = +T
// 입력 받은 수 배열
const groupOfNumbers = numbersString.split(' ').map(n => +n)
// 입력 받은 수 중 최대값
const max = Math.max(...groupOfNumbers)
// 내림차순 정렬 위한 스택
const stack = []
// 출력 배열
const answer = Array.from({
    length: countOfNumbers
}, (v, k) => -1)
// 입력 받은 수들의 등장 횟수를 담는 배열
const countOfAppearances = Array.from({
    length: max + 1
}, (v, k) => 0)
// 입력 받은 수들의 등장 횟수
for (let i = 0; i < countOfNumbers; i++) {
    countOfAppearances[groupOfNumbers[i]] += 1
}
for (let i = 0; i < countOfNumbers; i++) {
    // 현재 위치의 수가 스택 안에 있는 수들보다 등장 횟수가 큰 경우 스택 내부 원소들의 인덱스에 차례로 현재 위치의 수 입력
    while (stack.length !== 0 &&
           countOfAppearances[groupOfNumbers[stack[stack.length - 1]]] <
           countOfAppearances[groupOfNumbers[i]]) {
        const index = stack.pop()
        answer[index] = groupOfNumbers[i]
    }
    // 현재 위치의 수의 인덱스 Stack에 저장
    stack.push(i)
}

console.log(answer.join(' '))
