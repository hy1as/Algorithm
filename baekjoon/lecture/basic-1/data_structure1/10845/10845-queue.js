const fs = require('fs')
const os = require('os');
const [N, ...commands] = fs.readFileSync(os.platform() ===
                                         'linux' ? '/dev/stdin' : 'input.txt')
                           .toString().split('\n').map(input => input.trim());

class Queue {
    _arr = [];

    size() {
        return this._arr.length;
    }

    empty() {
        return this.size() === 0 ? 1 : 0;
    }

    push(number) {
        this._arr.push(number);
    }

    pop() {
        if (this.empty()) {
            return -1
        }
        return this._arr.shift();
    }

    front() {
        if (this.empty()) return -1;
        return this._arr[0];
    }

    back() {
        if (this.empty()) return -1;
        return this._arr[this._arr.length - 1];
    }
}


function solution(countOfCommands, commands) {
    const answer = [];
    const queue = new Queue();
    for (let i = 0; i < countOfCommands; i++) {
        const [command, argument] = commands[i].split(' ');
        switch (command) {
            case 'push':
                queue.push(+argument);
                break;
            case 'pop':
                answer.push(queue.pop());
                break;
            case 'size':
                answer.push(queue.size())
                break;
            case 'empty':
                answer.push(queue.empty())
                break;
            case 'front':
                answer.push(queue.front())
                break;
            case 'back':
                answer.push(queue.back())
                break;
        }
    }
    return answer.join('\n')
}

const answer = solution(N, commands);
console.log(answer);