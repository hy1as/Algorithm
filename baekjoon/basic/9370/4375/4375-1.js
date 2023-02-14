const fs = require('fs');
const groupOfInputData = fs.readFileSync('input.txt').toString().split('\n').map(input => +input);
let answer = [];
// 일반 Bruteforce 방식 사용 시  Test case parameter 값에 따라 시간 초과 발생 가능
// Modular 연산 통해 연산 대상의 크기를 줄이는 Logic이 필요
for (let i = 0; i < groupOfInputData.length; i++) {
    const inputData = groupOfInputData[i];
    let multipleValue = 1;
    let count = 0;
    while (true) {
        count++;
        let modValue = multipleValue % inputData;
        if (modValue === 0) {
            answer.push(count)
            break;
        }
        multipleValue = (modValue * 10) % inputData + 1;
    }
}
console.log(answer.join('\n'));
