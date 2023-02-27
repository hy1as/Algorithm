const fs = require('fs');
const os = require('os');
const [a, b] = fs.readFileSync(os.platform() ===
                               'linux' ? '/dev/stdin' : 'input.txt').toString()
                 .split('\n').map(input => input.trim());
const countOfNumbers = +a;
const numbers = b.split(' ').map(number => +number);
let answer = 0;

function isPrime(a) {
    if (a < 2) {
        return false;
    }
    for (let i = 2; i * i < a; i++) {
        if (a % i === 0) return false;
    }
    return true;
}

for (let i = 0; i < countOfNumbers; i++) {
    const current = numbers[i];
    if(isPrime(current)) answer++;
}
console.log(answer);