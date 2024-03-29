const fs = require('fs');
let input = +fs.readFileSync(process.platform ===
                             'linux' ? '/dev/stdin' : 'input.txt').toString()
let answer = [];
while (input !== 0) {
    const remainder = input % -2;
    if (remainder === -1 || remainder === 1) {
        input = Math.floor(input / -2) + 1;
        answer.push(1);
    } else if (remainder === 0) {
        input = Math.floor(input / -2);
        answer.push(0);
    }
}

console.log(answer.length === 0 ? '0' : answer.reverse().join(''))