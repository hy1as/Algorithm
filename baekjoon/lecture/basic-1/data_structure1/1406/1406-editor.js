const fs = require('fs');
const os = require('os');
const [sentence, countOfCommands, ...commands] = fs.readFileSync(os.platform() ===
                                                                 'linux' ? '/dev/stdin' : 'input.txt')
                                                   .toString().split('\n')
                                                   .map(input => input.trim());

function solution(s, count, commands) {
    const left = [];
    const right = [];
    [...s].forEach(char => left.push(char));
    for (let i = 0; i < count; i++) {
        const seperatatedCommand = commands[i].split(' ');
        switch (seperatatedCommand[0]) {
            case 'L':
                if (left.length !== 0) right.push(left.pop());
                break;
            case 'D':
                if (right.length !== 0) left.push(right.pop());
                break;
            case 'B':
                if (left.length !== 0) left.pop();
                break;
            case 'P':
                left.push(seperatatedCommand[1]);
                break;
        }
        console.log(`Left : ${left} Right : ${right}`)
    }
    return left.join('') + right.reverse().join('');
}

const answer = solution(sentence, countOfCommands, commands)
console.log(answer);