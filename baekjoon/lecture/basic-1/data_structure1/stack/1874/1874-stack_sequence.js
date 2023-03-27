const fs = require('fs');
const os = require('os');
const [max, ...sequence] = fs.readFileSync(os.platform() ===
                                           'linux' ? '/dev/stdin' : 'input.txt')
                             .toString().split('\n')
                             .map(input => +input.trim());
let operations = [];
const stack = []
let current = 0;
for (let i = 0; i < max; i++) {
    const number = sequence.shift();
    if (current < number) {
        while(current < number) {
            stack.push(++current);
            operations.push('+');
        }
        stack.pop();
        operations.push('-')
    } else {
        let found = false;
        if (stack.length !== 0) {
            const top = stack.pop();
            operations.push('-');
            if (top === number) {
                found = true;
            }
        }
        if(!found) {
            operations = [];
            break;
        }
    }
}
console.log(operations.length === 0 ? "NO" : operations.join('\n'));