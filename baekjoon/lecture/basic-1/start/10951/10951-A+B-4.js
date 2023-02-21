// Solution 1
const fs = require('fs');
const os = require('os');
const groupOfInput = fs.readFileSync(os.platform() ===
                                     'linux' ? '/dev/stdin' : 'input.txt')
                       .toString().trim().split('\n');
let i = 0;
while (i < groupOfInput.length) {
    const [a, b] = groupOfInput[i].split(' ').map(data => +data);
    console.log(a + b);
    i++;
}
// EOF 전달을 위해 process.exit()
process.exit();

// Solution 2
const fs = require('fs')
const os = require('os')
const readline = require('readline');
const rl = readline.createInterface({
    input: os.platform() === 'linux' ?  process.stdin : fs.createReadStream('input.txt'),
    output: process.stdout
})
let input;
rl.on("line", (line) => {
    input = line;
    const [a, b] = input.split(' ').map(d => +d);
    console.log(a + b);
}).on("close", () => {
    process.exit()
})

