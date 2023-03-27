const fs = require('fs');
const input = fs.readFileSync(process.platform ===
                              'linux' ? '/dev/stdin' : 'input.txt').toString()
                .trim().split('').map(n => +n).reverse();
const size = input.length;
let answer = [];
for (let i = 0; i < size; i++) {
    const first = Math.floor(input[i] / 4);
    const second = Math.floor((input[i] - first * 4) / 2);
    const third = input[i] - first * 4 - second * 2;
    if (i === size - 1) {
        answer.push(`${first === 0 ? '' : first}${first === 0 && second ===
                                                  0 ? '' : second}${third}`);
    } else {
        answer.push(`${first}${second}${third}`);
    }

}


console.log(answer.reverse().join(''));


