// const fs = require('fs');
// const os = require('os');
// const [T, ...sentences] = fs.readFileSync(os.platform() ===
//                                           'linux' ? '/dev/stdin' : 'input.txt')
//                             .toString().split('\n').map(input => input.trim());
// let answer = '';
// for (let i = 0; i < T; i++) {
//     const sentence = sentences[i];
//     const stack = [];
//     for (let j = 0; j < sentence.length; j++) {
//         if(j === sentence.length - 1){
//             stack.push(sentence[j]);
//         }
//         if (sentence[j] === ' ' || j === sentence.length - 1) {
//             while (stack.length > 0) {
//                 answer += stack.pop();
//             }
//             if(sentence[j] === ' ') {
//                 answer += ' ';
//             }
//         } else {
//             stack.push(sentence[j]);
//         }
//     }
//     answer += '\n';
// }
// console.log(answer)

const fs = require('fs');
const os = require('os');
const [T, ...sentences] = fs.readFileSync(os.platform() ===
                                          'linux' ? '/dev/stdin' : 'input.txt')
                            .toString().split('\n').map(input => input.trim());
let answer = '';
for (let i = 0; i < T; i++) {
    const sentence = sentences[i] + '\n';
    const stack = [];
    for (let j = 0; j < sentence.length; j++) {
        if (sentence[j] === ' ' || sentence[j] === '\n') {
            while (stack.length > 0) {
                answer += stack.pop();
            }
            answer += sentence[j];
        } else {
            stack.push(sentence[j]);
        }
    }
}
console.log(answer)

for (const sentence of sentences) {
    let groupOfFlippedWords = [];
    const words = sentence.split(' ');
    for (const word of words) {
        groupOfFlippedWords.push([...word].reverse().join(''));
    }
    console.log(groupOfFlippedWords.join(' '));
}