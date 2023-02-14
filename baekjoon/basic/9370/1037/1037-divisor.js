const fs = require('fs');
const [countOfDivisorsInput, divisorsInput] = fs.readFileSync('input.txt').toString().split('\n');
const countOfDivisors = parseInt(countOfDivisorsInput);
let divisors = divisorsInput.split(' ').map(divisor => +divisor);
divisors = divisors.sort((a, b) => a - b);
// My solving
console.log(countOfDivisors % 2 === 0 ? divisors[0] * divisors[divisors.length -1] : divisors[Math.floor(countOfDivisors / 2)] ** 2);
// Other solving
console.log(divisors[0] * divisors[divisors.length -1]);







