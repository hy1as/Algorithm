const fs = require('fs')
const digit = +fs.readFileSync(process.platform ===
                               'linux' ? '/dev/stdin' : 'input.txt').toString()
                 .trim()
const memo = Array.from({
    length: digit + 1
}, (v, k) => Array.from({
    length: 2
}, (v, k) => 0n))


memo[1][1] = 1n;

for (let i = 2; i <= digit; i++) {
    memo[i][0] = memo[i - 1][0] + memo[i - 1][1]
    memo[i][1] = memo[i - 1][0]
}

console.log((memo[digit][0] + memo[digit][1]).toString())