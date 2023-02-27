const fs = require('fs');
const os = require('os');
const [T, ...cases] = fs.readFileSync(os.platform() ===
                                      'linux' ? '/dev/stdin' : 'input.txt')
                        .toString().split('\n');
const countOfTestCases = +T;
const groupOfCase = cases.map(testCase => testCase.trim().split(' ')
                                                  .map(c => +c));

function getGCD(a, b) {
    while (b !== 0) {
        let r = a % b;
        a = b;
        b = r;
    }
    return a;
}

const answer = [];

for (let i = 0; i < countOfTestCases; i++) {
    const [countOfNumber, ...targetNumbers] = groupOfCase[i];
    let sum = 0;
    const sortedTargetNumbers = targetNumbers.sort((a, b) => b - a);
    for (let j = 0; j < countOfNumber - 1; j++) {
        let k = j + 1;
        while (k < countOfNumber){
            const GCD = getGCD(sortedTargetNumbers[j], sortedTargetNumbers[k]);
            sum += GCD;
            k++;
        }
    }
    answer.push(sum);
}

console.log(answer.join('\n'))

