const fs = require('fs');
const os = require('os')
// const input = parseInt(fs.readFileSync(os.platform() === "linux" ? "/dev/stdin" : "input.txt").toString())
const input = 10;
let answer = 0;
for (let i = 1; i <= input; i++) {
    let sumOfDivisors = 0;
    for (let j = 1; j < i / 2 + 1; j++) {
        if(i % j === 0){
           sumOfDivisors += Math.floor((i / j)) * j
        }
    }
    answer += sumOfDivisors;
}
console.log(answer);
