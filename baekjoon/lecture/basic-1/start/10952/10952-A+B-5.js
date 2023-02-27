const fs = require('fs');
const os = require('os');
const groupOfInput = fs.readFileSync(os.platform() === 'linux' ? '/dev/stdin' : 'input.txt')
                       .toString().split('\n');
let i = 0;
while (true) {
    if (groupOfInput[i] === '0 0') break;
    const [a, b] = groupOfInput[i].split(' ').map(input => +input);
    console.log(a + b);
    i++;
}
