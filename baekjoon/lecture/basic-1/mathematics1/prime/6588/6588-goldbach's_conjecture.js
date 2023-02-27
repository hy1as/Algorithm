const fs = require('fs');
const os = require('os');
const [...cases] = fs.readFileSync(os.platform() ===
                                   'linux' ? '/dev/stdin' : 'input.txt')
                     .toString().split('\n').map(c => +c.trim())
let i = 0;
const max = Math.max(...cases);
const arr = new Array(max + 1).fill(false, 0, max + 1);
arr[0] = true;
arr[1] = true;
for (let i = 2; i * i <= max; i++) {
    if(arr[i]) continue;
    for (let j = i + i; j <= max; j += i) {
        arr[j] = true;
    }
}

const answer = [];

while (cases[i] !== 0) {
    for (let j = cases[i] - 2; j >1 ; j--) {
        if(!arr[j] && !arr[cases[i] - j]) {
            answer.push(`${cases[i]} = ${cases[i] - j} + ${j}`)
            break;
        }
    }
    i++;
}

console.log(answer.join('\n'))