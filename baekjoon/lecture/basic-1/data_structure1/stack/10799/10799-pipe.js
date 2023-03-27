const fs = require('fs');
const os = require('os');
const groupOfParenthesis = fs.readFileSync(os.platform() ===
                                           'linux' ? '/dev/stdin' : 'input.txt')
                             .toString().split('');
let answer = 0;
let prev = '';
const stack = [];

for (const parenthesis of groupOfParenthesis) {
    if (parenthesis === ')') {
        stack.pop()
        if (prev === '(') {
            answer += stack.length;
        } else {
            answer += 1;
        }
        prev = parenthesis;
    } else {
        stack.push(parenthesis);
        prev = parenthesis;
    }
}
console.log(answer)