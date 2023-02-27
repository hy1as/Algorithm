class Dequeue {
    _arr = [];

    pushFront(number) {
        this._arr.unshift(number);
    }

    pushBack(number) {
        this._arr.push(number);
    }

    popFront() {
        if (this._arr.length === 0) return -1;
        return this._arr.shift();
    }

    popBack() {
        if (this._arr.length === 0) return -1;
        return this._arr.pop();
    }

    size() {
        return this._arr.length;
    }

    empty() {
        return this._arr.length === 0 ? 1 : 0;
    }

    front() {
        if (this._arr.length === 0) {
            return -1;
        }
        return this._arr[0];
    }

    back() {
        if (this._arr.length === 0) return -1;
        return this._arr[this._arr.length - 1];
    }
}

const fs = require('fs');
const os = require('os');
const [N, ...commands] = fs.readFileSync(os.platform() ===
                                         'linux' ? '/dev/stdin' : 'input.txt').toString().split('\n');

function solution(countOfCommands, commands) {
    const ret = [];
    const dequeue = new Dequeue();
    for (let i = 0; i < countOfCommands; i++) {
        const [command, argument] = commands[i].split(' ').map(c => c.trim());
        switch (command) {
            case 'push_front':
                dequeue.pushFront(+argument);
                break;
            case 'push_back':
                dequeue.pushBack(+argument);
                break;
            case 'pop_front':
                ret.push(dequeue.popFront());
                break;
            case 'pop_back':
                ret.push(dequeue.popBack());
                break;
            case 'size':
                ret.push(dequeue.size());
                break;
            case 'empty':
                ret.push(dequeue.empty());
                break;
            case 'front':
                const front = dequeue.front();
                ret.push(front);
                break;
            case 'back':
                ret.push(dequeue.back());
                break;

        }
    }
    return ret;
}


const answer = solution(N, commands);
console.log(answer.join('\n'));
