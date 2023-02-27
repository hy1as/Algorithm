const fs = require('fs');
const os = require('os');
const [a, b] = fs.readFileSync(os.platform() ===
                               'linux' ? '/dev/stdin' : 'input.txt').toString()
                 .split('\n');
const [countOfBrothers, position] = a.split(' ').map(n => +n);
const [...brothers] = b.split(' ').map(n => Math.abs(parseInt(n) - position))
                       .sort((a, b) => b - a);

function getGCD(a, b) {
    while (b !== 0) {
        let r = a % b;
        a = b;
        b = r;
    }
    return a;
}

let answer = brothers[0];
for (let i = 1; i < countOfBrothers; i++) {
    answer = getGCD(answer, brothers[i]);
    console.log(answer)
}

// Index 주의
// for (let j = 0; j < countOfBrothers - 1; j++) {
//     answer = getGCD(brothers[j], brothers[j + 1]);
//     console.log(answer)
// }

console.log(answer);
