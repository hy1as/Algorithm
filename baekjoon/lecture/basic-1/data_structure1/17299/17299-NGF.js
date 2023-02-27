const fs = require('fs');
const os = require('os');
const [N, sequence] = fs.readFileSync(os.platform() ===
                                      'linux' ? '/dev/stdin' : 'input.txt')
                        .toString().split('\n');
const sequenceCount = +N;
const groupOfSequenceElement = sequence.split(' ').map(el => +el);
const groupOfCount = new Array(sequenceCount).fill(0, 0, sequenceCount + 1);
const answer = [];
for (let i = 0; i < N; i++) {
    groupOfCount[groupOfSequenceElement[i]]++;
}
const stack = [0];
for (let i = 1; i < N; i++) {
    if(stack.length === 0) {
        stack.push(i)
    }
    while (stack.length !== 0 && groupOfCount[groupOfSequenceElement[stack[stack.length - 1]]] <
           groupOfCount[groupOfSequenceElement[i]]) {
        const index = stack.pop();
        answer[index] = groupOfSequenceElement[i];
    }
    stack.push(i);
}
while(stack.length !== 0) {
    answer[stack.pop()] = -1;
}

console.log(answer.join(' '))



