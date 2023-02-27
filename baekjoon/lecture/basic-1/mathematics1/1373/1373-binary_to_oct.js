const fs = require('fs');
const os = require('os');
let binaryNumber = fs.readFileSync(os.platform() ===
                                   'linux' ? '/dev/stdin' : 'input.txt')
                     .toString().trim();
let answer = '';
while (binaryNumber.length >= 3) {
    answer = parseInt(binaryNumber.slice(binaryNumber.length - 3), 2)
                 .toString(8) + answer
    binaryNumber = binaryNumber.slice(0, binaryNumber.length - 3);
}

if (binaryNumber.length !== 0) {
    answer = parseInt(binaryNumber, 2).toString(8) + answer
}

console.log(answer)