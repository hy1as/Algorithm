const fs = require('fs');
const os = require('os');
class Stack {
    arr = [];
    size = 0;

    empty() {
        return this.size === 0;
    }

    push(number) {
        this.arr.push(number);
        this.size++;
    }

    pop() {
        let ret = -1
        if (!this.empty()) {
            ret = this.arr[this.size - 1];
            this.arr.splice(this.size - 1);
            this.size--;
        }
        return ret;
    }

    top() {
        if(this.empty()) return -1;
        return this.arr[this.size - 1];
    }
}
const [T, ...commands] = fs.readFileSync(os.platform() ===
                                         'linux' ? '/dev/stdin' : 'input.txt')
                           .toString().split('\n');
let commandCount = +T;
const stack = new Stack();
let answer = [];
for (let i = 0; i < commandCount; i++) {
    const command = commands[i].trim().split(' ');
    switch (command[0]) {
        case 'push':
            stack.push(+command[1]);
            break;
        case 'pop':
            answer.push(stack.pop())
            break;
        case 'size':
            answer.push(stack.size)
            break;
        case 'empty':
            answer.push(stack.empty() ? 1 : 0)
            break;
        case 'top':
            answer.push(stack.top())
            break;
    }
}
console.log(answer.join('\n'))
