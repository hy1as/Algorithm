const fs = require('fs');
const os = require('os');
const [a, b] = fs.readFileSync(os.platform() === "linux" ? "/dev/stdin" : 'input.txt')
                 .toString().split('\n').map(input => +input);
console.log(a + b);
