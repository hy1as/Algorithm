const fs = require('fs');
const os = require('os');
const [N, sequence] = fs.readFileSync(os.platform() ===
                                      'linux' ? '/dev/stdin' : 'input.txt')
                        .toString().split('\n').map(input => input.trim());
const answer = [];
const gruopOfSequenceElement = sequence.split(' ').map(el => +el);
const stack = [0];
for (let i = 1; i < N; i++) {
    while (stack.length !== 0 && gruopOfSequenceElement[stack[stack.length - 1]]  < gruopOfSequenceElement[i]) {
        const index = stack.pop();
        answer[index] = gruopOfSequenceElement[i];
    }
    stack.push(i);
}
while (stack.length !== 0) {
    const index = stack.pop();
    answer[index] = -1;
}
console.log(answer.join(' '));





