const fs = require('fs');
const os = require('os');
const [T, ...cases] = fs.readFileSync(os.platform() ===
                                      'linux' ? '/dev/stdin' : 'input.txt')
                        .toString().split('\n');
const groupOfCase = cases.map(c => c.trim().split(' ').map(num => +num));

function getGCD(a, b) {
    // Error : StackSizeExceed
    // if (b === 0) {
    //     return a;
    // }
    // return getGCD(b, a % b);
    while (b !== 0) {
        let r = a % b
        a = b;
        b = r;
    }
    return a;
}

function getLCM(a, b) {
    return (a * b) / getGCD(a, b);
}

const answer = [];

// Error : 시간 초과
groupOfCase.forEach(([a, b]) => {
    answer.push(getLCM(a, b));
})
for (let i = 0; i < T; i++) {
    const [a, b] = groupOfCase[i];
    answer.push(getLCM(a, b))
}

console.log(answer.join('\n'));

function isPrime(number) {
    if (number < 2) return false;
    for (let i = 2; i ** 2 <= number; i++) {
        if (number % i === 0) return false;
    }
    return true;
}


function getGroupOfPrimeLeastThanNumber(number) {
    const sieve = Array.from({
        length: number + 1,
    }, () => true)
    sieve[0] = false;
    sieve[1] = false;
    for (let i = 2; i * i <= number; i++) {
        if (!sieve) continue;
        for (let j = i * 2; j <= number; j += i) {
            sieve[j] = false
        }
    }
    const groupOfPrime = [];
    sieve.forEach((val, index) => {
        if(val) groupOfPrime.push(index);
    })
    return groupOfPrime
}

console.log(getGroupOfPrimeLeastThanNumber(100))
