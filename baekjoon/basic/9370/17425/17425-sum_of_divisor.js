const fs = require('fs')
let [a, ...groupOfInput] = fs.readFileSync('input.txt').toString().split('\n');
groupOfInput = groupOfInput.map(input => +input.trim())
let output = [];
for (let i = 0; i < a; i++) {
    let answer = 0;
    for (let j = 1; j <= groupOfInput[i]; j++) {
        answer += Math.floor(groupOfInput[i] / j) * j;
    }
    output.push(answer);
}
console.log(output.join('\n'))

