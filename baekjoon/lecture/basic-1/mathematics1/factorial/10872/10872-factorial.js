const fs = require('fs');
const os = require('os');
const N = fs.readFileSync(os.platform() ===
                          'linux' ? '/dev/stdin' : 'input.txt');
let answer = 1;
for (let i = N; i > 1; i--) {
    answer *= i;
}
console.log(answer)