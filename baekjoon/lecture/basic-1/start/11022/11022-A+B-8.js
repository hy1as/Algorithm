const fs = require('fs');
const os = require('os');
const [T, ...cases] = fs.readFileSync(os.platform() ===
                                      'linux' ? '/dev/stdin' : 'input.txt')
                        .toString().split('\n');
for (let i = 0; i < T; i++) {
    const [a, b] = cases[i].split(' ').map(input => +input);
    console.log(`Case #${i + 1}: ${a} + ${b} = ${a + b}`);
}