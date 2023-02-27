const fs = require('fs');
const os = require('os');
const [n, m] = fs.readFileSync(os.platform() ===
                               'linux' ? '/dev/stdin' : 'input.txt').toString()
                 .split(' ').map(num => +num);

function getDividerCount(target, divider) {
    let count = 0;
    let currentDivider = divider;
    while (currentDivider <= target) {
        count += Math.floor(target / currentDivider);
        currentDivider *= divider;
    }
    return count;
}

let twoCount = 0;
let fiveCount = 0;

twoCount += getDividerCount(n, 2)
fiveCount += getDividerCount(n, 5)

twoCount -= getDividerCount(n - m, 2)
fiveCount -= getDividerCount(n - m, 5)

twoCount -= getDividerCount(m, 2)
fiveCount -= getDividerCount(m, 5)

console.log(Math.min(twoCount, fiveCount));
