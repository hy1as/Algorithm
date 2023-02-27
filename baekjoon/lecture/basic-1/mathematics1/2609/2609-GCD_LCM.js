const fs = require('fs')
const os = require('os');
const [a, b] = fs.readFileSync(os.platform() ===
                               'linux' ? '/dev/stdin' : 'input.txt').toString()
                 .split(' ').map(num => +num);

function getGCD(a, b) {
    if (b === 0) {
        return a;
    }
    return getGCD(b, a % b);
}

function getLCM(a, b) {
    return (a * b) / getGCD(a, b);
}

const GCD = getGCD(a, b);
const LCM = getLCM(a, b)

console.log(GCD + '\n' + LCM);

