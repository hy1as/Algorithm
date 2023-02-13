const fs = require('fs');
const inputData = fs.readFileSync("input.txt").toString().split(' ').map(value => +value);
const [a, b, c] = inputData;

console.log((a + b) % c);
console.log(((a % c) + (b % c)) % c);
console.log((a * b) % c);
console.log(((a % c) * (b % c)) % c);
