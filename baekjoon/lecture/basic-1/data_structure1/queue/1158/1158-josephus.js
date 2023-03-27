const fs = require('fs');
const os = require('os');
const [N, K] = fs.readFileSync(os.platform() ===
                               'linux' ? '/dev/stdin' : 'input.txt').toString()
                 .split(' ').map(input => +input);
const queue = Array.from({length: N}, (_, i) => i + 1);
const answer = [];
let i = 0;
while(queue.length > 0){
    i++;
    const begin  = queue.shift();
    if(i % K === 0) {
        answer.push(begin);
        continue;
    }
    queue.push(begin);
}
console.log(`<${answer.join(', ')}>`);
