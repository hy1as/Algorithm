const fs = require('fs');
const os = require('os');
const factorialNumber = +fs.readFileSync(os.platform() === 'linux' ? '/dev/stdin' : 'input.txt').toString();

function getNumberCount(target, divider) {
    let count = 0;
    let currentDivider = divider;
    while(currentDivider <= target) {
        count += Math.floor(target / currentDivider);
        currentDivider *= divider;
    }
    return count;
}

console.log(getNumberCount(factorialNumber, 5));