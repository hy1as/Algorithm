const fs = require('fs');
const [T, ...cases] = fs.readFileSync(process.platform ===
                                      'linux' ? '/dev/stdin' : 'input.txt')
                        .toString().split('\n').map(n => +n.trim());
const answer = [];
const max = Math.max(...cases);
const sieve = new Array(max).fill(false, 0, max);
sieve[0] = true;
sieve[1] = true;
for (let i = 2; i * i < max; i++) {
    if (sieve[i]) {
        continue;
    }
    let current = i + i;
    while (current < max) {
        sieve[current] = true;
        current += i;
    }
}
for (const c of cases) {
    let count = 0;
    for (let i = 2; i * i < c; i++) {
        if(!sieve[i] && !sieve[c - i]) count++;
    }
    answer.push(count)
}
console.log(answer.join('\n'));