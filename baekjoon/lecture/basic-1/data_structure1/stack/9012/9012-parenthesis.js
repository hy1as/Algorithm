const fs = require('fs');
const os = require('os');
const [T, ...groupOfPS] = fs.readFileSync(os.platform() === 'linux' ? '/dev/stdin' : 'input.txt').toString().split('\n').map(input => input.trim())
let answer = [];
for (let i = 0; i < T; i++) {
    const PS = groupOfPS[i];
    const stack = [];
    let isSet = false;
    for (let j = 0; j < PS.length; j++) {
        if(PS[j] === '('){
            stack.push(PS[j]);
        }else {
            if(stack.length === 0) {
                answer.push('NO')
                isSet = true;
                break;
            }
            stack.pop();
        }
    }
    if(!isSet) {
        if (stack.length === 0) {
            answer.push('YES')
        } else {
            answer.push('NO')
        }
    }
}

console.log(answer.join('\n'))